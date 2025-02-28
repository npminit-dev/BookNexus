import { useContext } from 'react';
import { GlobalContext } from './contexts/GlobalContext';
import { BsMoonStarsFill, BsFillSunFill } from 'react-icons/bs'
import { Switch } from 'antd';
import '../styles/global-variables.css'
import '../styles/themeswitcher.css'


export default function ThemeSwitcher(): JSX.Element {

  const { colorMode, setColorMode } = useContext(GlobalContext)

  return (
    <div className='ThemeSw-container'>
      <Switch
        defaultChecked={ colorMode === 'light' ? false : true }
        size='default'
        className='ThemeSwitch'
        unCheckedChildren={<BsFillSunFill
          className='ThemeSWSun-icon'
        />}
        checkedChildren={<BsMoonStarsFill
          className='ThemeSWMoon-icon'
        />}
        onChange={(checked) => setColorMode(checked ? 'dark' : 'light')}
      />
    </div>
  )
}