import { Button, Flex, Loader, MultiSelect, Tabs } from '@mantine/core'
import { useForm } from '@mantine/form'
import SessionList from '@/components/SessionsList'
import useSessionsToday from '@/hooks/useSessionsToday'
import { SessionsTodayPageTabs } from '@/enums'
import { TABS_CONFIG } from '@/constants/sessions'
import SEARCH_PARAMS from '@/constants/searchParams'

const SessionsHistory = () => {
  const page = 'HISTORY'
  const {
    isLoading,
    data: sessions,
    error,
    activeTab,
    setActiveTab,
  } = useSessionsToday(SessionsTodayPageTabs.ALL, page)
  const form = useForm<FormValue>({
    initialValues: {
      status: ['all'],
    },
  })

  const handleRefresh = (data) => {
    const {
      status,
    } = data
    console.log(data, status)
    const { pathname, search: query } = window.location
    const searchParams = new URLSearchParams(query)
    if (status && status.length > 0) {
      searchParams.set(SEARCH_PARAMS.STATUS, status.join())
      console.log(3, searchParams)
    }
    else {
      searchParams.delete(SEARCH_PARAMS.STATUS)
    }

    console.log('333333333333', window.location)
    history.push({
      pathname,
      search: decodeURIComponent(searchParams.toString()),
    })
  }

  const handleSubmit = async (values) => {
    console.log(values)
  }
  const handleReset = () => {
    form.reset()
  }
  const onFilterChange = (value) => {
    handleRefresh(value)
  }
  const handleStatusChange = (selectedStatus, fieldName) => {
    form.setFieldValue(fieldName, selectedStatus)
    const updateFormFields = {
      ...form.values,
      [fieldName]: selectedStatus,
    }
    onFilterChange(updateFormFields)
  }

  return (
    <>
      <form onSubmit={form.onSubmit(values => handleSubmit(values))}>
        <Flex gap="md" justify="center" align="center" direction="row" style={{ width: '50%' }}>
          <MultiSelect
            data={[
              { value: 'open', label: 'OPEN' },
              { value: 'locked', label: 'LOCKED' },
              { value: 'finish', label: 'FINISHED' },
              { value: 'paymentNeeded', label: 'PAYMENT NEEDED' },
              { value: 'all', label: 'ALL' },
            ]}
            placeholder="Pick"
            transitionProps={{ duration: 150, transition: 'pop-top-left', timingFunction: 'ease' }}
            defaultValue={['all']}
            style={{ width: '50%' }}
            {...form.getInputProps('status')}
            onChange={value => handleStatusChange(value, 'status')}
          />
          <Button
            type="submit"
            size="15px"
            styles={theme => ({
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
          Search
          </Button>
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
          {isLoading
            ? (
              <Loader className="loader" />
            )
            : (
              <SessionList sessionsList={sessions} />
            )}
        </Tabs.Panel>
      </Tabs>
    </>
  )
}

export default SessionsHistory
