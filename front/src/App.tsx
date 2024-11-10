import {Formik} from "formik";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Calendar} from "@/components/ui/calendar.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Button} from "@/components/ui/button.tsx";
import {CalendarIcon} from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {getTransactions, postTransactions} from "@/api";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import *  as Yup from 'yup' ;

const schema = Yup.object().shape({
    dateTime: Yup.date().required('Дата обязательное поле'),
    sum: Yup.number().required('Сумма обязательное поле').min(0, 'Сумма должна быть положительная'),
    category: Yup.string().required('Категория обязательное поле'),
    comment: Yup.string(),
})

function App() {
    const queryClient = useQueryClient()
    const query = useQuery({queryKey: ['transactions'], queryFn: getTransactions})
    const mutation = useMutation({
        mutationFn: (data) => postTransactions(data), onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['transactions']})
        }
    })
    return (
        <>
            <Formik initialValues={{
                "dateTime": new Date,
                "author": "",
                "sum": 0,
                "category": "",
                "comment": ""
            }} validationSchema={schema} onSubmit={(values) => {
                // @ts-ignore
                mutation.mutate(values)
            }}>
                {({errors, values, setFieldValue, handleChange, handleSubmit,}) => (
                    <form onSubmit={handleSubmit}>
                        <Card className={'max-w-3xl mx-auto mt-2'}>
                            <CardHeader>
                                <CardTitle>Форма ввода расходов</CardTitle>
                                <CardDescription>Введите данные ваших расходов</CardDescription>
                            </CardHeader>
                            <CardContent className={'flex flex-col gap-2'}>

                                <Label htmlFor={'date'}>Дата*</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            id={'date'}
                                            variant={"outline"}
                                        >
                                            <CalendarIcon/>
                                            {values?.dateTime.toLocaleDateString() ?? <span>Выберете дату</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            initialFocus
                                            selected={values?.dateTime}
                                            onSelect={(value) => setFieldValue('dateTime', value)}
                                        />
                                    </PopoverContent>
                                </Popover>
                                <Label htmlFor={'amount'}>Сумма*</Label>
                                <Input type={'number'}  id={'amount'} value={values.sum} onChange={handleChange('sum')}
                                       min={0}/>
                                <Label>Категория*</Label>
                                <Select onValueChange={(value) => setFieldValue('category', value)}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Выбирите категорию"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {["Электричество", 'Периферия', 'Прочие'].map((item) => (
                                            <SelectItem value={item} key={item}>{item}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Label htmlFor={'comment'}>Комментарий</Label>
                                <Textarea
                                    value={values.comment} onChange={handleChange('comment')}
                                    placeholder={'Введите комментарий'} id={'comment'}/>

                            </CardContent>

                            <CardFooter className='gap-2'>
                                <Button variant="outline" type={'submit'}>Сохранить</Button>
                                <span className={'text-red-600'}>{errors?.author}</span>
                                <span className={'text-red-600'}>{errors?.sum}</span>
                                <span className={'text-red-600'}>{errors?.comment}</span>
                                <span className={'text-red-600'}>{errors?.category}</span>
                            </CardFooter>
                        </Card>

                    </form>
                )}
            </Formik>
            <Table className={'mx-auto max-w-4xl mt-3'}>
                <TableCaption>Список всех транзакций</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Id</TableHead>
                        <TableHead>Автор </TableHead>
                        <TableHead>Дата</TableHead>
                        <TableHead>Сумма</TableHead>
                        <TableHead>Категория</TableHead>
                        <TableHead>Комментарий</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {query.error ?? query?.data?.map((item: any) => (
                        <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.id}</TableCell>
                            <TableCell>{item.author}</TableCell>
                            <TableCell>{new Date(item.dateTime).toLocaleDateString()}</TableCell>
                            <TableCell>{item.sum}</TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>{item.comment}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}

export default App
