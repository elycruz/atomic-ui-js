import Link from 'next/link';
import {NavItem} from '../../data/types';

let _uuid = Number.MIN_SAFE_INTEGER;

export function UnorderedListNav({items, containerOnly}: NavItem) {
  if (containerOnly) {
    return <UnorderedListNav items={items}/>;
  }

  return <ul>
    {items.map(({uri, label, items: subItems}, i) =>
      <li  key={`nav-list-item-${i}-${_uuid++}`}>
        <Link href={uri}>{label}</Link>

        {subItems?.length && <UnorderedListNav items={subItems}/>}
      </li>)}
  </ul>;
}
