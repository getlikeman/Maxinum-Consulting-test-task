import {http, HttpResponse} from 'msw'
type transaction={category:string,comment:string,dateTime:string,sum:number}
let data=[
    {
        "id": 2,
        "dateTime": "2022-01-20T12:01:30.543Z",
        "author": "string",
        "sum": 0,
        "category": "string",
        "comment": "string"
    },
    {
        "id": 3,
        "dateTime": "2022-01-20T12:01:30.543Z",
        "author": "string",
        "sum": 0,
        "category": "string",
        "comment": "string"
    }
]
// @ts-ignore
export const handlers = [http.get(`https://example.com/transactions`,() =>{
    return HttpResponse.json(data)
}),
http.post('https://example.com/transactions',async ({request })=>{
    const res = await request.json()
    data.push({id:Math.floor(Math.random() * 30) ,author: 'test',...res as transaction})
    return HttpResponse.json(res,{status:201})
})

]
