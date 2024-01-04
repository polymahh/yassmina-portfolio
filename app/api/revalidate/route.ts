import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
 
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
 
  if (secret === process.env.MY_PASSWORD) {
    revalidatePath("/projects")
    revalidatePath("/resume")
    return NextResponse.json({ revalidated: true, message : "success! new data will show after couple refreshes" })
  }
 
  return NextResponse.json({
    revalidated: false,
    now: Date.now(),
    message: 'Missing param to revalidate',
  })
}