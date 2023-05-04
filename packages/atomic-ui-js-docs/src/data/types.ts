export interface NavItem {
  label?: string;
  uri?: string;
  alias?: string;
  containerOnly?: boolean;
  className?: string;
  items?: NavItem[];
}
