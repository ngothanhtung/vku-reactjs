export async function GET(request: Request) {
    const products = [
        {id: 1, name: 'product 1'},
        {id: 2, name: 'product 2'},
        {id: 3, name: 'product 3'}
    ]
    return Response.json({ products })
}