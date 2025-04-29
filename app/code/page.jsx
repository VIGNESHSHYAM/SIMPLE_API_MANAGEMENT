
import React from 'react'
import DashboardLayout from '@/components/dashboard'
import ClientConnectCode from '@/components/ClientSideCode'
function CODE() {
  return (
    <div>
         <DashboardLayout code={true}>
<ClientConnectCode >
    
</ClientConnectCode>
         </DashboardLayout>

    </div>
  )
}

export default CODE