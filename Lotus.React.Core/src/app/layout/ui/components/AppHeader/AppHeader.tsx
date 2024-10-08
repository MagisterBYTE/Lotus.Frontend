import { LayoutHelper } from 'app/layout/helpers';
import { useLayoutHeaderState } from 'app/layout/store/LayoutSelector';
import React, { ComponentPropsWithoutRef } from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import { FiMenu } from 'react-icons/fi';
import { Button } from 'ui/components/Controls';
import { Theme } from 'ui/theme';
import './AppHeader.css';


// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IAppHeaderProps extends ComponentPropsWithoutRef<'header'> 
{

}

export const AppHeader: React.FC<IAppHeaderProps> = (props: IAppHeaderProps) => 
{
  const headerState = useLayoutHeaderState();

  const toggleDrawer = () => 
  {
    // const status = !layoutState.leftPanel.isOpen;
    // dispatch(openLeftPanelLayoutAction(status));
  };

  const handleOpenSettings = () => 
  {
    const event = LayoutHelper.createOpenViewSettingsEvent();
    window.dispatchEvent(event);
  };

  return <>{headerState.isVisibleUser && headerState.isVisible &&
    <header {...props} className='lotus-app-header' style={{ ...Theme.getBackgroundColorProps(undefined, 'pale') }}>
      <Button style={{ flexGrow: '0', margin: '1rem' }} variant='icon' size='large' onClick={toggleDrawer} children={<FiMenu />} />
      <div style={{ flexGrow: '1' }}>{props.children}</div>
      <Button style={{ flexGrow: '0', margin: '1rem' }} variant='icon' size='large' onClick={handleOpenSettings} children={<BsPersonCircle />} />
    </header>}
  </>
};

