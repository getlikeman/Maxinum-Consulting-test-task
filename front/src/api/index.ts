import { ofetch } from "ofetch";

const api=ofetch.create({baseURL:`https://example.com/`})

const getTransactions=async ()=>await api('/transactions')
const postTransactions=async (body: any)=>await api('/transactions',{method:'Post',body})

export {getTransactions,postTransactions};
