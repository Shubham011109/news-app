import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import { Fragment } from 'react'
import NewsHome from '@/newsHome'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
  <Fragment>
    <NewsHome/>
  </Fragment>
  )
}
