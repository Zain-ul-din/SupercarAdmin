import {
   Avatar,
   Badge,
   Center,
   Text,
   Flex,
   Table,
   TableContainer,
   Tbody,
   Td,
   Th,
   Thead,
   Tr,
   useMediaQuery,
   Box
} from '@chakra-ui/react';
import WhiteButton from './design/WhiteButton';
import { ViewIcon } from '@chakra-ui/icons';
import { useDocsCount } from '@/lib/hooks/useDocsCount';
import { membersColRef, paymentsColRef } from '@/lib/firebase';
import { MemberDocType, PaymentDocType } from '@/lib/firebase_docstype';
import { useEffect, useRef, useState } from 'react';
import { getDocs } from 'firebase/firestore';
import Pagination from './design/Pagination';
import { usePaginator } from 'chakra-paginator';
import usePagination from '@/lib/hooks/usePagination';
import PaymentContentHeader from './design/PaymentContentHeader';

const pageQt = 15;

export default function Payments() {
   const [paymentsCount] = useDocsCount(paymentsColRef);
   const [payments, setPayments] = useState<Array<PaymentDocType>>([]);

   useEffect(() => {
      const fetchPayments = async () => {
         const paymentsDocs = await getDocs(paymentsColRef);
         const users = (await getDocs(membersColRef)).docs.map((d) => ({
            ...d.data(),
            uid: d.id
         })) as Array<MemberDocType>;

         setPayments(
            paymentsDocs.docs.map((d) => ({
               ...d.data(),
               user_data: users.filter((u) => u.uid == (d.data() as PaymentDocType).recipient)[0]
            })) as Array<PaymentDocType>
         );
      };

      fetchPayments();
   }, []);

   const [under800] = useMediaQuery('(max-width: 800px)');

   const [requestsToShow, paginationIndices, setActiveIdx] = usePagination<PaymentDocType>(
      payments,
      pageQt
   );

   const { currentPage, setCurrentPage } = usePaginator({
      total: paginationIndices.length,
      initialState: {
         pageSize: pageQt,
         currentPage: 1
      }
   });

   const topRef = useRef<any>(null);

   return (
      <Flex width="100%" flexDir="column" gap="1rem" height="100%" pb={'2rem'} ref={topRef}>
         <PaymentContentHeader heading={`All Payments (${paymentsCount})`} description="" />
         <Flex
            flex={3}
            width={'100%'}
            minHeight={'90vh'}
            flexDir={'column'}
            gap={'1rem'}
            p={under800 ? '0.5rem' : '1rem'}
            py={0}
            bg={'var(--grey-color)'}
            rounded={'lg'}
         >
            <Flex flexDir={'column'} gap={'1rem'} overflowY={'auto'} flexBasis={'90%'}>
               <PaymentsTable payments={payments} />
            </Flex>
            <Flex flexBasis={'17%'} alignSelf={'flex-end'}>
               <Box>
                  <Pagination
                     pageCounts={paginationIndices.length}
                     handlePageChange={(page) => {
                        setActiveIdx(page);
                        (topRef.current as HTMLElement)?.scrollIntoView({
                           behavior: 'smooth'
                        });
                     }}
                  />
               </Box>
            </Flex>
         </Flex>
      </Flex>
   );
}

const PaymentsTable = ({ payments }: { payments: Array<PaymentDocType> }) => {
   const [under800] = useMediaQuery('(max-width: 800px)');

   return (
      <TableContainer p={under800 ? '0.2rem' : '1rem'} overflowY={'auto'}>
         <Table variant="unstyled" size={'sm'}>
            <Thead>
               <Tr>
                  <Th>Customer</Th>
                  <Th>Date Processed</Th>
                  <Th>Vehicle</Th>
                  <Th>Amount</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
               </Tr>
            </Thead>
            <Tbody>
               {payments.map((payment, i) => {
                  return (
                     <Tr key={i}>
                        <Td>
                           <Flex flexDir={'row'} gap={'0.3rem'}>
                              {payment.user_data ? (
                                 <Avatar
                                    size="sm"
                                    name={`${payment.user_data.name}_avatar`}
                                    src={payment.user_data.photo}
                                 />
                              ) : (
                                 <Avatar size="sm" border={'1px solid white'} />
                              )}

                              <Center>
                                 {payment.user_data ? (
                                    <Text textAlign={'center'}>{payment.user_data.name}</Text>
                                 ) : (
                                    <Text textAlign={'center'}>UnKnown</Text>
                                 )}
                              </Center>
                           </Flex>
                        </Td>
                        <Td>{new Date(payment.timestamp * 1000).toDateString()}</Td>
                        <Td>2021 Lamborghini Urus</Td>
                        <Td>${payment.amount}</Td>
                        <Td>
                           <Badge colorScheme="green">Deposited</Badge>
                        </Td>
                        <Td>
                           <WhiteButton size={'sm'}>
                              <ViewIcon mr={'0.3rem'} />
                              View
                           </WhiteButton>
                        </Td>
                     </Tr>
                  );
               })}
            </Tbody>
         </Table>
      </TableContainer>
   );
};
