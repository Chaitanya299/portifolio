import { NextRequest } from 'next/server';
import { GET as meGET } from '../me/route';

export async function GET(req: NextRequest) {
  return meGET(req);
}
