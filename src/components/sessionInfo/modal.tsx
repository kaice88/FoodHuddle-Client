/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRequestProcessor } from '@/settings/reactQuery';
import { TextInput, Button, Group, Textarea, Flex, Text } from '@mantine/core';
import isEmpty from 'lodash/isEmpty';
import { useForm } from '@mantine/form';
import { REQUEST_GET_SESSION_INFO } from '@/constants/apis';
import { Image } from 'antd';
import { IconCheck, IconX, IconSquarePlus } from '@tabler/icons-react';
import { REQUEST_POST_SESSION_INFO } from '@/constants/apis';
import { FormValue } from './types';
import axiosInstance from '@/settings/axios';
import { notificationShow } from '../notifications/notification';
import { loadingShow } from '../loading/loading';
import UploadImages from '../uploadFile/uploadFile';

const SessionInfo: React.FC = () => {
  const [paymentInfo, setPaymentInfo] = useState<any>('');
  const navigate = useNavigate();
  const { query, mutation } = useRequestProcessor();
  const fetchQuerySessionInfo = query(
    ['paymentInfo'],
    async () => await (await axiosInstance.get(REQUEST_GET_SESSION_INFO)).data,
    { enabled: false },
  );
  useEffect(() => {
    const handlefetchSessionInfo = async () => {
      const response = await fetchQuerySessionInfo.refetch();
      if (response.isSuccess) {
        console.log('get-pay-info');
        setPaymentInfo(response.data);
      }
      if (response.isError) {
        console.log('get-pay-info-eror');
        notificationShow('error', 'ERROR', response.error.message);
      }
    };
    handlefetchSessionInfo();
  }, []);

  const fetchMutationSessionInfo = mutation(
    ['sessionInfo'],
    (data: FormValue) => axiosInstance.post(REQUEST_POST_SESSION_INFO, data),
    {
      enabled: false,
    },
  );
  // //......RESET FORM VALUE......................................
  const resetForm = () => {
    form.reset();
  };

  //......Config form.................................................
  const form = useForm<FormValue>({
    initialValues: {
      title: '',
      shopLink: '',
      description: '',
      hostPaymentInfo: paymentInfo,
      qrImages: [],
      status: 'OPEN',
    },

    validate: {
      title: (value) => (value ? null : 'Title is required'),
      shopLink: (value) => (value ? null : 'Link Shop is required'),
      hostPaymentInfo: (value) => (value ? null : 'Payment Infomation is required'),
    },
  });

  const handleSubmitNewSession = async (values: FormValue) => {
    const dataForm = {
      title: values.title,
      shop_link: values.shopLink,
      description: values.description,
      host_payment_info: values.hostPaymentInfo,
      qr_images: values.qrImages,
      status: values.status,
    };
    console.log(dataForm);
    fetchMutationSessionInfo.mutate(dataForm);
    const titleNavigate = form.getInputProps('title').value;
    navigate(`/sessions-today/${titleNavigate}`);
    notificationShow('success', 'Success: ', 'Create the new session sucessfully');
    // close();
  };

  if (fetchMutationSessionInfo.isSuccess) {
    console.log(11111111);
    // const {id} = data
    notificationShow('success', 'Success: ', 'Create the new session sucessfully');
    const titleNavigate = form.getInputProps('title').value;
    navigate(`/sessions-today/${titleNavigate}`);
  }

  if (fetchMutationSessionInfo.isError) {
    console.log(11111111);
    // const {id} = fetchMutationSessionInfo.data
    notificationShow('success', 'Error: ', fetchMutationSessionInfo.error.message);
    navigate(`/sessions-today/${'..'}`);
  }

  const handleOnChangeUploadFile = (value: File[]) => {
    console.log('setvalue---------QRCODE', value);
    form.setFieldValue('qrImages', value);
  };
  return (
    <>
      {fetchQuerySessionInfo.isLoading && loadingShow()}
      <form onSubmit={form.onSubmit((values) => handleSubmitNewSession(values))}>
        <Flex
          gap="md"
          justify="center"
          align="flex-start"
          direction="row"
          style={{ width: '100%' }}
        >
          <Flex
            gap="md"
            justify="center"
            align="center"
            direction="column"
            style={{ width: '50%' }}
          >
            <TextInput
              withAsterisk
              label="Title"
              placeholder='Drink "Tra Sua"'
              {...form.getInputProps('title')}
              style={{ width: '100%' }}
            />
            <TextInput
              withAsterisk
              label="Link shop"
              placeholder="https://shopeefood.vn/da-nang/tra-sua"
              {...form.getInputProps('shopLink')}
              style={{ width: '100%' }}
            />
            <Textarea
              placeholder="Add more detailed descriptions about your session"
              label="Description"
              autosize
              maxRows={4}
              {...form.getInputProps('description')}
              style={{ width: '100%' }}
            />
          </Flex>
          <Flex
            gap="md"
            justify="center"
            align="center"
            direction="column"
            style={{ width: '50%' }}
          >
            <Textarea
              withAsterisk
              placeholder="Payment method: TP Bank/Momo ...; Card name: 'A'; ..."
              label="Payment info"
              autosize
              maxRows={4}
              {...form.getInputProps('hostPaymentInfo')}
              style={{ width: '100%' }}
            />
            <Flex
              style={{ width: '100%' }}
              gap="md"
              justify="flex-start"
              align="flex-start"
              direction="row"
            >
              <Text size="sm" fw={600}>
                QR code
              </Text>
              <Group position="center">
                <UploadImages handleOnChange={handleOnChangeUploadFile} />
              </Group>
            </Flex>
          </Flex>
        </Flex>
        <Group position="right" mt="md">
          <Button type="submit" variant="outline" color="yellow" size="xs" onClick={resetForm}>
            Reset
          </Button>
          <Button
            type="submit"
            variant="outline"
            size="xs"
            // disabled={!isEmpty(form.errors) || !form.isDirty()}
          >
            Submit
          </Button>
        </Group>
      </form>
    </>
  );
};

export default SessionInfo;
