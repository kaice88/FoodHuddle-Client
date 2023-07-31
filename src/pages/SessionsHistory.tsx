import { Button, Flex, Loader, MultiSelect, Tabs } from '@mantine/core'
import { useForm } from '@mantine/form'
import SessionList from '@/components/SessionsList'
import useSessionsToday from '@/hooks/useSessionsToday'
import { SessionsTodayPageTabs } from '@/enums'
import { TABS_CONFIG } from '@/constants/sessions'

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

  const handleSubmit = async (values) => {
    console.log(values)
    console.log(form.values)
    // call API
  }
  const handleReset = () => {
    form.reset()
  }
  const handleStatusChange = (selectedStatus) => {
    console.log('Selected Status:', selectedStatus)
    form.setFieldValue('status', selectedStatus)
    // call API
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
            style={{ width: '25%' }}
            {...form.getInputProps('status')}
            onChange={handleStatusChange}
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
