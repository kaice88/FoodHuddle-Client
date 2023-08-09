import { Flex, MultiSelect, Tabs } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import SessionList from '@/components/SessionsList'
import useSessionsToday from '@/hooks/useSessionsToday'
import { SessionsTodayPageTabs } from '@/enums'
import { TABS_CONFIG } from '@/constants/sessions'
import SEARCH_PARAMS from '@/constants/searchParams'
import useSessionInfoStore from '@/store/sessionInfoStore'

const SessionsHistory = () => {
  const page = 'HISTORY'
  const [queryParameters] = useSearchParams()
  const navigate = useNavigate()

  const {
    isLoading,
    data: sessions,
    error,
    activeTab,
    setActiveTab,
    setStatus,
  } = useSessionsToday(SessionsTodayPageTabs.ALL, page)

  const form = useForm<FormValue>({
    initialValues: {
      status: [],
    },
  })
  const { setSessionInfoData } = useSessionInfoStore()
  useEffect(() => {
    setSessionInfoData({})
    setStatus(decodeURIComponent(queryParameters.toString()))
    const outputArray = queryParameters.get('status')?.split(',')
    const value = outputArray?.map(item => item)
    form.setFieldValue('status', value)
    navigate(`?${decodeURIComponent(queryParameters.toString())}`)
  }, [])

  const onFilterChange = (data) => {
    const {
      status,
    } = data

    if (status && status.length > 0)
      queryParameters.set(SEARCH_PARAMS.STATUS, status.join())

    else
      queryParameters.delete(SEARCH_PARAMS.STATUS)

    setStatus(decodeURIComponent(queryParameters.toString()))

    navigate(`?${decodeURIComponent(queryParameters.toString())}`)
  }

  const handleStatusChange = (value, fieldName) => {
    form.setFieldValue(fieldName, value)
    const updateFormFields = {
      ...form.values,
      [fieldName]: value,
    }
    onFilterChange(updateFormFields)
  }

  return (
    <>
      <form>
        <Flex gap="md" justify="flex-end" align="center" direction="row" style={{ width: '100%' }}>
          <MultiSelect
            data={[
              { value: 'OPEN', label: 'Open' },
              { value: 'LOCKED', label: 'Locked' },
              { value: 'PENDING PAYMENTS', label: 'Pending Payments' },
              { value: 'FINISHED', label: 'Finished' },
            ]}
            placeholder="All status"
            transitionProps={{ duration: 150, transition: 'pop-top-left', timingFunction: 'ease' }}
            defaultValue={['all']}
            style={{ width: '25%' }}
            {...form.getInputProps('status')}
            onChange={value => handleStatusChange(value, 'status')}
          />
        </Flex>
      </form>
      <Tabs value={activeTab} onTabChange={setActiveTab}>
        <Tabs.List position="center">
          {TABS_CONFIG.map(tab => (
            <Tabs.Tab key={tab.value} value={tab.value}>
              {tab.title}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        <Tabs.Panel value={activeTab} pt="xl">
          <SessionList isLoading={isLoading} sessionsList={sessions} />
        </Tabs.Panel>
      </Tabs>
    </>
  )
}

export default SessionsHistory
