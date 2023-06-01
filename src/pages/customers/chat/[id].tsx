import Customers from '@/components/Customers';
import Login from '@/components/Login';
import MainLayout from '@/components/design/MainLayout';
import Head from 'next/head';

export default function ChatPage() {
   return (
      <>
         <Head>
            <title>SuperCar Automation</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <MainLayout>
            <Login />
         </MainLayout>
      </>
   );
}
