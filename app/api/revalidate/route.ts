import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'
 
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
 
  if (secret === process.env.MY_PASSWORD) {
    revalidatePath("/")
    return Response.json({ revalidated: true, message : "success! new data will show after couple refreshes" })
  }
 
  return Response.json({
    revalidated: false,
    now: Date.now(),
    message: 'Missing param to revalidate',
  })
}