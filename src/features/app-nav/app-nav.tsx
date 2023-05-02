import {NavItem} from "../../data/types";
import {UnorderedListNav} from "../../components/unordered-list-nav";
import {navigationItems} from "../../data/navigation-items";

export function AppNav() {
  return <nav>{
    navigationItems.map(({label, items, ...rest}: NavItem) => <>
        <h3>{label}</h3>
        <UnorderedListNav items={items} {...rest} />
      </>
    )}
  </nav>
}
