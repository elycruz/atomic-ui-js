import Link from 'next/link';
import {NavItem} from "../../data/types";

export function UnorderedListNav({label, uri, items, containerOnly, ...rest}: NavItem) {
  if (containerOnly) {
    return <UnorderedListNav items={items} {...rest} />;
  }

  return <ul {...rest}>
    <li>
      <Link href={uri}>{label}</Link>

      {items?.length && items.map(item => (
        <UnorderedListNav {...item} />
      ))}
    </li>
  </ul>
}
