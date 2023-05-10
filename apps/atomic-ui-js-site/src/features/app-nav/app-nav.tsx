import {NavItem} from '../../data/types';
import {UnorderedListNav} from '../../components/unordered-list-nav';
import {navigationItems} from '../../data/generated/navigation-items';

export function AppNav() {
  return <nav className="x-app-nav">{
    navigationItems[0]?.items.map(({label, items}: NavItem) => <>
      <h3>{label}</h3>
      <UnorderedListNav items={items} />
    </>
    )}
  </nav>;
}
