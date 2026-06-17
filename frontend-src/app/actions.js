'use server'

import { cookies } from 'next/headers'

export async function saveMyCookie(email) {
  const cookieStore = await cookies()
  cookieStore.set('userEmail', email, { httpOnly: true })
}