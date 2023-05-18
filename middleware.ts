import { NextRequest, NextResponse } from 'next/server';

function matchPathname(url: URL, pathname: string) {
  return url.pathname.startsWith(pathname);
}

export async function middleware(req: NextRequest) {
  // const url = req.nextUrl.clone();

  // if (matchPathname(url, '/api/location/favourite')) {
  //   console.log('Favourite location middleware');
  // }

  return NextResponse.next();
}
