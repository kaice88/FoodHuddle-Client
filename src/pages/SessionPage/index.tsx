import { Flex, Loader, Tabs } from '@mantine/core'
import { useParams } from 'react-router-dom'
import { IconShoppingCart, IconSubtask } from '@tabler/icons-react'
import { useEffect } from 'react'
import { isEmpty } from 'lodash'
import OrderTab from './Components/OrderTab'
import SummaryTab from './Components/SummaryTab'
import SessionInfo from '@/components/SessionInfo'
import useAuth from '@/hooks/useAuth'
import useSessionInfo from '@/hooks/useSessionInfo'
import useSessionInfoStore from '@/store/sessionInfoStore'
import { checkIfUserIsHost } from '@/utils/sessions'

function SessionPage() {
  const { sessionId } = useParams()
  const { sessionInfoData } = useSessionInfoStore()
  const { fetchSessionInfo } = useSessionInfo(sessionId)

  useEffect(() => {
    const handleGetSessionInfo = async () => {
      await fetchSessionInfo.refetch()
    }
    handleGetSessionInfo()
  }, [])
  const { userProfile } = useAuth()

  const isHosted = !isEmpty(sessionInfoData) && checkIfUserIsHost(sessionInfoData?.host, userProfile)
  return (
    <>
      {
        !isEmpty(sessionInfoData)
          ? <>
            <SessionInfo sessionData={sessionInfoData} sessionId={sessionId} isHosted={isHosted} />
            <Tabs keepMounted={false} defaultValue={'order'}>
              <Tabs.List>
                <Tabs.Tab value="order" icon={<IconShoppingCart />}>
                Order
                </Tabs.Tab>
                <Tabs.Tab value="summary" icon={<IconSubtask />}>
                Summary
                </Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value="order">
                <OrderTab />
              </Tabs.Panel>
              <Tabs.Panel value="summary">
                {!isEmpty(sessionInfoData) && <SummaryTab sessionId={sessionId} isHosted={isHosted}/>}
              </Tabs.Panel>
            </Tabs>
          </>
          : <Flex justify="center" align="center">
            <Loader/>
          </Flex>
      }
    </>

  )
}

export default SessionPage
