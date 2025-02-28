import { useContext, useState } from "react"
import { GlobalContext } from "../contexts/GlobalContext"
import { Dropdown, MenuProps, Modal } from "antd"
import { DeleteOutlined, ReadFilled } from "@ant-design/icons"
import { IoMdCheckmarkCircle } from 'react-icons/io'
import { GlobalContextType } from "../../types/globalcontext"
import '../../styles/readlist/readlistactions.css'
import '../../styles/global-variables.css'


export default function ReadListActions(): JSX.Element {
  
  const { readList, dispatchRl, messageApi, colorMode, wWidth } = useContext<GlobalContextType>(GlobalContext)
  const [ clearReadsModal, setclearReadsModal ] = useState<boolean>(false)
  const [ clearAllModal, setclearAllModal ] = useState<boolean>(false)

  const actionItems = [
    {
      label: 'Set all as read',
      key: '1',
      icon: <IoMdCheckmarkCircle />,
      disabled: !readList?.some(interest => !interest.read),
      className: `ActionItem ${colorMode}`
    },
    {
      label: 'Set all as unread',
      key: '2',
      disabled: !readList?.some(interest => interest.read),
      icon: <ReadFilled />,
      className: `ActionItem ${colorMode}`
    },
    { 
      label: 'Clear reads',
      key: '3',
      danger: true,
      disabled: !readList?.some(interest => interest.read),
      icon: <DeleteOutlined />,
      className: `ActionItem ${colorMode}`
    },
    {
      label: 'Clear read list',
      key: '4',
      danger: true,
      icon: <DeleteOutlined />,
      className: `ActionItem ${colorMode}`
    },
  ]


  const itemProps: MenuProps = {
    items: actionItems,
    onClick: (info: any) => {
      switch(info.key) {
        case '1': dispatchRl({ type: 'setAllRead' })
        break;
        case '2': dispatchRl({ type: 'setAllUnread' })
        break;
        case '3': setclearReadsModal(true)
        break;
        case '4': setclearAllModal(true)
      }
    } 
  }

  const handleOk_clearAll = () => {
    dispatchRl({ type: 'set', payload: [] })
    setclearAllModal(false)
    messageApi?.info({ 
      content: 'The reading list has been cleared',
      duration: 2
     })
  }

  const handleOk_clearReads = () => {
    dispatchRl({ type: 'clearRead' })
    setclearReadsModal(false)
    messageApi?.info({ 
      content: 'Read books cleared',
      duration: 2
     })
  }

  return (
    <div className='RLActions-container'>
      <Dropdown.Button 
        size={ wWidth < 310 ? 'small' : 'middle' }
        disabled={readList?.length ? false : true}
        type="default"
        trigger={['click']}
        menu={itemProps}
        className={`RLActionsDropdown-main ${colorMode}`}
        overlayClassName={`RLActionsDropdown-overlay ${colorMode}`}
      >
        More actions
      </Dropdown.Button>
      <Modal
        title='Deleting the reading list...'
        okText='Confirm'
        open={clearAllModal}
        onOk={ handleOk_clearAll }
        onCancel={() => setclearAllModal(false)}
      >
        Are you sure to empty the reading list? This action cannot be undone.
      </Modal>
      <Modal
        title='Deleting read books...'
        okText='Confirm'
        open={clearReadsModal}
        onOk={ handleOk_clearReads }
        onCancel={() => setclearReadsModal(false)}
      >
        You will clear read books. This action cannot be undone.
      </Modal>
    </div>
  )
}