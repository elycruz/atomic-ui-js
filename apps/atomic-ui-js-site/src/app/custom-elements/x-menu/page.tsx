export default function MenuPage() {
  return <>
    <nav className="x-menu x-menu--horizontal">
      <ul>
        <li><a href="#link-1">Link 1</a></li>
        <li><a href="#link-2">Link 2</a>
          <ul>
            <li><a href="#link-2.1">Link 2.1</a></li>
            <li><a href="#link-2.2">Link 2.2</a>
              <ul>
                <li><a href="#link-2.1">Link 2.1</a></li>
                <li><a href="#link-2.2">Link 2.2</a></li>
                <li><a href="#link-2.3">Link 2.3</a></li>
                <li><a href="#link-2.4">Link 2.4</a></li>
              </ul>
            </li>
            <li><a href="#link-2.3">Link 2.3</a></li>
          </ul>
        </li>
        <li><a href="#link-3">Link 3</a></li>
        <li><a href="#link-4">Link 4</a>
          <ul>
            <li><a href="#link-4.1">Link 4.1</a></li>
            <li><a href="#link-4.2">Link 4.2</a></li>
            <li><a href="#link-4.3">Link 4.3</a></li>
          </ul>
        </li>
        <li><a href="#link-5">Link 5</a></li>
      </ul>
    </nav>

    <nav className="x-menu">
      <ul>
        <li><a href="#link-1">Link 1</a></li>
        <li><a href="#link-2">Link 2</a>
          <ul>
            <li><a href="#link-2.1">Link 2.1</a></li>
            <li><a href="#link-2.2">Link 2.2</a>
              <ul>
                <li><a href="#link-2.1">Link 2.1</a></li>
                <li><a href="#link-2.2">Link 2.2</a></li>
                <li><a href="#link-2.3">Link 2.3</a></li>
                <li><a href="#link-2.4">Link 2.4</a></li>
              </ul>
            </li>
            <li><a href="#link-2.3">Link 2.3</a></li>
          </ul>
        </li>
        <li><a href="#link-3">Link 3</a></li>
        <li><a href="#link-4">Link 4</a>
          <ul>
            <li><a href="#link-4.1">Link 4.1</a></li>
            <li><a href="#link-4.2">Link 4.2</a></li>
            <li><a href="#link-4.3">Link 4.3</a></li>
          </ul>
        </li>
        <li><a href="#link-5">Link 5</a></li>
      </ul>
    </nav>
  </>;
}
