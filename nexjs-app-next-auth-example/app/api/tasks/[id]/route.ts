export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    //1. check session
    //2. check id
    //3. call api
    //4. return response
}

// update
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    //1. check session
    //2. check id
    //3. check body
    const body = await request.json();
    //4. call api voi method PATH theo tai lieu
    //5. return response
}

// xóa
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    //1. check session
    //2. check id
    //3. call api
    //4. return response
}