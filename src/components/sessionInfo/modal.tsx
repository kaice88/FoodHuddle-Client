/* eslint-disable */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRequestProcessor } from '@/settings/reactQuery';
import { TextInput, Button, Group, Textarea, Flex, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { REQUEST_POST_SESSION_INFO, REQUEST_GET_HOST_PAYMENT_INFO } from '@/constants/apis';
import { FormValue, FormatDataSessionInfo } from './types';
import axiosInstance from '@/settings/axios';
import { notificationShow } from '../notifications/notification';
import UploadImages from '../uploadFile/uploadFile';

const SessionInfo: React.FC = () => {
  const navigate = useNavigate();
  const { query, mutation } = useRequestProcessor();
  const fetchQuerySessionInfo = query(
    ['paymentInfo'],
    () => axiosInstance.get(REQUEST_GET_HOST_PAYMENT_INFO),
    {
      enabled: false,
      onSuccess: (data) => {
        form.setFieldValue('hostPaymentInfo', data.data.hostPaymentInfor);
      },
      onError: (error) => {
        notificationShow('error', 'ERROR', error.message);
      },
    },
  );
  useEffect(() => {
    const handlefetchSessionInfo = async () => {
      await fetchQuerySessionInfo.refetch();
    };
    handlefetchSessionInfo();
  }, []);

  const fetchMutationSessionInfo = mutation(
    ['sessionInfo'],
    async (dataForm: FormatDataSessionInfo) =>
      await axiosInstance.post(REQUEST_POST_SESSION_INFO, dataForm),
    {
      onError: (error) => {
        console.log('erorrr-mutation');
        notificationShow('error', 'Error: ', error.message);
      },
      onSuccess: (data) => {
        console.log(data);
        const { id, message } = data.data;
        notificationShow('success', 'Success: ', message);
        navigate(`/sessions-today/${id}`);
      },
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
      hostPaymentInfo: '',
      qrImages: [],
      status: 'OPEN',
    },

    validate: {
      title: (value) => (value ? null : 'Title is required'),
      shopLink: (value) => (value ? null : 'Link Shop is required'),
      hostPaymentInfo: (value) => (value ? null : 'Payment Infomation is required'),
    },
  });
  //.....Handle submit.............................................
  const handleSubmitNewSession = async (values: FormValue) => {
    const dataForm = {
      title: values.title,
      shop_link: values.shopLink,
      description: values.description,
      host_payment_info: values.hostPaymentInfo,
      qr_images: '',
      status: values.status,
    };
    fetchMutationSessionInfo.mutate(dataForm);
  };
  const handleOnChangeUploadFile = (value: File[]) => {
    form.setFieldValue('qrImages', value);
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmitNewSession(values))}>
      <Flex gap="md" justify="center" align="flex-start" direction="row" style={{ width: '100%' }}>
        <Flex gap="md" justify="center" align="center" direction="column" style={{ width: '50%' }}>
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
        <Flex gap="md" justify="center" align="center" direction="column" style={{ width: '50%' }}>
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
        <Button
          onClick={resetForm}
          size="15px"
          styles={(theme) => ({
            root: {
              backgroundColor: theme.fn.lighten(theme.colors.duck[0], 0.9),
              color: theme.colors.duck[0],
              ...theme.fn.hover({
                backgroundColor: theme.fn.lighten(theme.colors.duck[0], 0.8),
              }),
              padding: '10px',
            },
          })}
        >
          Reset
        </Button>
        <Button
          type="submit"
          size="15px"
          styles={(theme) => ({
            root: {
              backgroundColor: theme.fn.lighten(theme.colors.orange[0], 0.9),
              color: theme.colors.orange[0],
              ...theme.fn.hover({
                backgroundColor: theme.fn.lighten(theme.colors.orange[0], 0.8),
              }),
              padding: '10px',
            },
          })}
        >
          Submit
        </Button>
      </Group>
    </form>
  );
};

export default SessionInfo;
