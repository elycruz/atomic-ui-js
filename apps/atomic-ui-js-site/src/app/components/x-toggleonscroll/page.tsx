import XToggleClassOnScrollComponent from 'atomic-ui-js-next/x-toggleonscroll';
import XRippleComponent from 'atomic-ui-js-next/x-ripple';
import styles from './page.module.scss';

// const triggerThresholds = Array(10).fill(null, 0, 10).map((_, i) => i * 0.1);

interface LipsumArticleProps /*extends IntersectionObserverInit*/ {
  anchorTarget?: string;
  className?: string;
  classNameToToggle?: string;
  classNameToToggleTarget?: string;
  title?: string;
  trigger?: string;
  root?: string;
  rootMargin?: string;
  threshold?: number | number[];
}

const lipsumArticle = ({
  root = null,
  className = 'xtoggle-scroll-target',
  trigger = '#top-anchor',
  title = 'Using Page Scrollbar',
  anchorTarget = '#top-anchor',
  classNameToToggleTarget = '.xtoggle-scroll-target',
  classNameToToggle = styles['with-back-to-top-btn--visible'],
  rootMargin = '200px 0px 0px 0px',
  threshold = [0.5, 1]
} = {} as LipsumArticleProps) => {
  return <article className={className}>
    {anchorTarget !== '#' && <a id={anchorTarget.slice(1)}></a>}

    <header>
      <span className="x-h3">{title}</span>
    </header>

    <section>
      <h4>&ldquo;Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
        velit...&rdquo;</h4>

      <h5>&ldquo;There is no one who loves pain itself, who seeks after it and wants to have it,
        simply because it is pain...&rdquo;</h5>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus risus erat, scelerisque at ex id,
        ullamcorper consequat nisi. Vivamus tincidunt ante at posuere iaculis. Ut vel urna ut leo pretium
        consectetur. Cras congue euismod lacinia. Curabitur quis mauris ac ipsum vehicula ornare. Morbi
        metus tellus, tempor sed nunc sed, tempor rutrum felis. Nam volutpat sem nec mauris interdum, quis
        euismod ligula sagittis.
      </p>
      <p>
        Integer faucibus felis felis, id ornare eros porta vitae. Cras quis dolor scelerisque, molestie
        justo eget, bibendum purus. Morbi dignissim et lorem id fermentum. Mauris non mollis arcu. In
        pulvinar, diam ut cursus tempor, ligula metus eleifend orci, vel condimentum lectus nunc non augue.
        Cras orci sapien, pulvinar nec placerat ut, accumsan sit amet nisl. Sed malesuada lacus et tristique
        accumsan. Phasellus pellentesque velit sit amet porttitor facilisis. Etiam elementum condimentum
        metus, ut rhoncus diam. Etiam eu dignissim purus, id aliquam mi. Vivamus ultricies tempor luctus.
        Vestibulum sagittis lorem erat, sed pretium mi pharetra eget. Aenean ullamcorper urna quis velit
        tincidunt, at posuere dolor molestie.
      </p>
      <p>
        Sed tincidunt vel urna eu venenatis. Class aptent taciti sociosqu ad litora torquent per conubia
        nostra, per inceptos himenaeos. Maecenas id ex sed tellus ornare imperdiet blandit facilisis eros.
        Nunc finibus sollicitudin est, et ultrices massa sodales nec. Quisque congue rhoncus ipsum et
        ultrices. Nullam quam diam, ultricies vitae tortor ac, sollicitudin posuere magna. Nullam pulvinar
        scelerisque nibh, vitae finibus augue ultrices id. Sed cursus mattis felis eu porttitor. Phasellus
        id finibus tellus. Morbi tempor mi at euismod molestie. In mollis magna nisl, id dapibus massa
        scelerisque ornare.
      </p>
      <p>
        Phasellus nec nulla risus. Donec ut felis viverra, porta felis vitae, luctus erat. Phasellus tempus
        faucibus nisi, a dictum lacus placerat id. Donec venenatis enim non vulputate condimentum. Mauris
        sit amet velit sed felis tristique feugiat ut ut turpis. Nam iaculis lobortis tristique. Sed
        tincidunt mattis sodales. Curabitur ut lacinia odio. Etiam eget malesuada risus. Curabitur quis
        dapibus leo. Aliquam vel convallis mi, vitae volutpat risus. Aliquam lobortis massa a sapien
        vehicula maximus. Mauris a aliquam nunc. Morbi lobortis porta magna, vitae tincidunt elit.
      </p>
      <p>
        Aliquam tellus orci, ultricies et turpis vitae, fermentum gravida neque. Class aptent taciti
        sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce commodo gravida dui,
        ut laoreet sem posuere sed. Aenean malesuada urna in ornare fringilla. Nulla a dapibus libero, at
        elementum ipsum. Vivamus quis dictum dolor. Quisque eget pulvinar lorem. Aliquam in massa tristique
        ipsum sagittis venenatis sed tempor turpis. Proin vel metus sed erat rhoncus rhoncus eget quis mi.
      </p>
      <p>
        Quisque sed diam eu nisi ultricies efficitur in et ex. Sed enim risus, porttitor dictum lacinia
        eget, scelerisque sed leo. Aenean mi massa, vestibulum nec libero ut, blandit luctus nisl. Cras eget
        enim sit amet nisl facilisis ornare ut sit amet elit. Maecenas sagittis tristique vestibulum. Cras
        quis interdum diam. Vestibulum efficitur mi nisl, a accumsan odio volutpat quis. Proin placerat nisl
        id consequat volutpat. Duis sollicitudin nisl turpis, ut iaculis dui faucibus a. Sed mattis metus
        nibh, vitae volutpat mi mattis nec. Duis non interdum ligula. In nibh libero, fermentum vitae eros
        eget, interdum tincidunt mi. Vestibulum lacinia consequat laoreet. Mauris lacinia lobortis justo non
        pulvinar. Cras sit amet gravida risus, in dapibus arcu. Quisque vehicula, turpis vel rutrum tempor,
        diam tellus maximus velit, non auctor urna ipsum quis justo.
      </p>
      <p>
        Sed varius maximus ligula, sit amet elementum lectus volutpat vel. In sit amet massa aliquet turpis
        iaculis ornare. Phasellus non erat eros. Orci varius natoque penatibus et magnis dis parturient
        montes, nascetur ridiculus mus. Sed eget efficitur felis, ut sagittis eros. Donec sit amet cursus
        enim. Fusce suscipit libero in sapien tincidunt venenatis. Nullam sit amet orci ac ligula lobortis
        pellentesque eu dictum purus. Sed finibus nibh in enim egestas venenatis. Integer vitae imperdiet
        elit. Morbi pretium tempus ante nec sodales. Mauris viverra dolor lectus, quis bibendum urna
        consequat tincidunt. Sed id suscipit velit. In consectetur pellentesque lobortis.
      </p>
      <p>
        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris
        tempus ligula ut suscipit cursus. Praesent eu malesuada purus, consequat molestie odio. Sed in
        mollis mauris. Donec dignissim erat ac metus malesuada faucibus. Maecenas sollicitudin sollicitudin
        consectetur. Ut sollicitudin lacus mi, euismod consectetur risus imperdiet in. Fusce placerat velit
        sed feugiat blandit. Fusce quis nisi vitae sem blandit semper.
      </p>
      <p>
        Nam faucibus ornare nibh, eget venenatis tellus congue a. Praesent fringilla nunc quis varius
        vulputate. Vestibulum facilisis ligula semper est pellentesque fermentum. Vestibulum bibendum ornare
        elit a porttitor. Integer elementum mauris sem, in cursus ligula suscipit eget. Duis eu augue et
        nisi venenatis tincidunt eget nec arcu. Sed in ex et ante elementum laoreet eget consequat neque.
        Donec tortor nulla, ultricies quis vehicula ut, malesuada nec diam.
      </p>
      <p>
        Curabitur tincidunt nisi scelerisque suscipit euismod. Curabitur fringilla pretium neque, eleifend
        vulputate neque cursus ornare. Donec vel pellentesque nibh. Praesent eget vulputate ante, nec
        rhoncus quam. Aenean sit amet quam ac nisl auctor cursus at id nisl. Proin faucibus, leo a convallis
        pharetra, lorem nibh tincidunt ex, et interdum sem tortor at nunc. Mauris id turpis vel velit
        dapibus rutrum. Sed non pellentesque libero. Donec sed ipsum venenatis felis placerat rhoncus. Proin
        in purus quis lorem efficitur dapibus non non dolor. Proin sit amet commodo augue, in consectetur
        urna. Vivamus a magna sodales, consequat enim a, commodo dui. Nullam sodales tincidunt leo.
        Curabitur faucibus faucibus malesuada. Donec nec quam eget leo aliquet molestie nec at augue.
      </p>
      <p>
        Donec a lectus non dui mollis ullamcorper eget in sapien. Curabitur feugiat libero at sapien
        tincidunt aliquet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus
        mus. Etiam vitae malesuada massa, quis placerat est. Aliquam auctor efficitur tellus bibendum
        faucibus. Nulla sagittis neque feugiat sagittis egestas. Curabitur eget vestibulum massa. Fusce
        auctor justo ac orci venenatis, eget condimentum dui consequat. Orci varius natoque penatibus et
        magnis dis parturient montes, nascetur ridiculus mus. Nullam at posuere tortor. In vel luctus augue,
        et dictum eros. Duis vulputate turpis leo, at molestie ipsum tempus ultrices. Suspendisse vulputate
        mollis euismod. Aliquam aliquam massa eu magna euismod, eu malesuada orci rutrum.
      </p>
      <p>
        Curabitur sed accumsan diam. Nunc a dolor non nisl ullamcorper porttitor vel vel augue. Sed commodo
        finibus nisi id iaculis. Aliquam metus dolor, tristique sed nulla vitae, tempor fermentum risus.
        Aenean tempus sapien a posuere porttitor. Aliquam ultrices mi sit amet bibendum ultrices. Nulla
        augue orci, eleifend id mi at, iaculis porta leo. Vivamus mollis turpis eu vestibulum tincidunt.
        Curabitur faucibus est tincidunt convallis tempus. Nam volutpat nec metus in sodales. Morbi nibh
        magna, viverra aliquam commodo quis, vulputate eu velit. Aliquam turpis orci, pulvinar quis rutrum
        nec, suscipit in risus.
      </p>
      <p>
        Mauris neque urna, laoreet eget ultricies sit amet, tristique a lectus. Donec auctor libero eu velit
        efficitur, non suscipit eros egestas. Sed sagittis commodo feugiat. Curabitur eu ornare ligula.
        Vestibulum iaculis lectus et purus placerat gravida. Maecenas vulputate condimentum convallis.
        Maecenas purus nunc, maximus ut purus non, bibendum vulputate magna. Aliquam porttitor molestie leo,
        sed gravida lectus condimentum a. Aenean mattis neque sit amet eros egestas, sit amet imperdiet urna
        ullamcorper. Integer id lacus eu justo commodo hendrerit. Nam non pellentesque mauris.
      </p>
      <p>
        Mauris sem purus, sodales quis laoreet sed, iaculis vel magna. Interdum et malesuada fames ac ante
        ipsum primis in faucibus. Proin leo nulla, suscipit sed rhoncus sed, varius non odio. Donec non quam
        eu felis tincidunt vestibulum et ac velit. Nulla suscipit dapibus libero, vitae iaculis ex congue
        quis. Fusce fermentum at arcu ut laoreet. Maecenas tincidunt efficitur lectus eu congue. In pretium,
        neque id dapibus porttitor, ligula massa iaculis ligula, quis euismod nibh dolor non metus.
      </p>
      <p>
        Curabitur sit amet mi iaculis, sodales purus sit amet, varius dui. Praesent dictum pellentesque
        metus, quis interdum dolor consectetur eget. Sed tincidunt tellus a dolor mattis pellentesque. Nunc
        dictum porttitor odio, quis sagittis est maximus nec. Proin mi odio, mollis eget rutrum a, tincidunt
        tempus tellus. Vivamus at ullamcorper erat. Suspendisse euismod neque sapien, id laoreet nisi
        fermentum eu. Aliquam nisl massa, consectetur at neque eget, aliquam tincidunt urna. Quisque purus
        sapien, rhoncus vel lacus eget, dapibus pretium massa. Phasellus pretium magna turpis. Praesent eu
        ligula enim. Duis vestibulum, eros eu sollicitudin venenatis, risus orci auctor ligula, eget
        sagittis elit metus id sem. Proin dapibus dolor tellus, vitae efficitur leo accumsan vitae.
        Phasellus pellentesque semper diam in suscipit. Ut ac semper nisl.
      </p>
      <p>
        Ut vel nisi eu erat bibendum rutrum at vulputate risus. Ut ullamcorper vitae nisi in tempor. In
        vestibulum viverra sem et facilisis. Aenean semper at libero ac auctor. Duis maximus velit quis
        varius laoreet. Nulla erat erat, aliquam vitae convallis vitae, congue vel mauris. Nulla et sagittis
        nisl. In porta sollicitudin nisl at iaculis. Phasellus sed metus urna. Pellentesque dictum non leo
        ac gravida. Ut eget efficitur erat. Aenean sed turpis pulvinar, elementum nisi et, pretium leo.
        Vivamus vitae ligula aliquet, eleifend libero at, ultricies odio. Donec ac sollicitudin diam, ut
        viverra sapien. Fusce non elit et diam ultricies rhoncus.
      </p>
      <p>
        Etiam tellus quam, tristique id velit eget, aliquam sodales mi. Nam ut purus vitae orci faucibus
        mollis laoreet non odio. Etiam eu efficitur arcu. Morbi sit amet nulla felis. Fusce molestie maximus
        elit, ac dignissim felis condimentum sit amet. Nunc sit amet mattis augue. Curabitur in iaculis
        nisl. Aliquam nec magna non dolor faucibus auctor quis et ante. Nam pellentesque velit a sapien
        iaculis, at bibendum augue rutrum.
      </p>
      <p>
        Quisque non nulla at mi condimentum luctus. Donec faucibus porta lectus nec euismod. Aenean congue
        nec ligula at semper. Ut tristique sapien vel hendrerit lobortis. Curabitur sed libero ipsum. Sed a
        accumsan arcu. Sed est justo, ultricies vehicula erat ac, egestas blandit turpis.
      </p>
      <p>
        Donec congue lobortis nibh, ut sollicitudin tellus eleifend eu. Vestibulum ante ipsum primis in
        faucibus orci luctus et ultrices posuere cubilia curae; In porttitor eros massa, ut placerat diam
        imperdiet eu. Fusce elementum sem ac quam pharetra interdum. Nulla sed ullamcorper diam. Donec
        libero erat, interdum sit amet nisl imperdiet, porta sagittis augue. Phasellus condimentum est
        ipsum, scelerisque lacinia nisl porttitor at.
      </p>
      <p>
        Fusce dictum turpis vel turpis tempor semper. Duis tristique interdum tristique. Nulla facilisi.
        Fusce purus arcu, vulputate sed nibh at, congue sagittis nisl. Nunc gravida diam accumsan, placerat
        ipsum venenatis, gravida sapien. Curabitur diam tellus, interdum sit amet vulputate luctus, rutrum
        nec ante. Nam fermentum, est quis porttitor euismod, velit purus hendrerit purus, vel tincidunt odio
        nibh at sem. Cras non purus a purus aliquam tempor. Donec non efficitur felis, in egestas lorem.
      </p>

      <p>Generated 20 paragraphs, 1713 words, 11555 bytes of
        <a href="https://www.lipsum.com/" title="Lorem Ipsum">&nbsp;
          <span>Lorem Ipsum</span></a>
      </p>

      <XToggleClassOnScrollComponent
        className={styles['back-to-top-btn-container']}
        classNameToToggle={classNameToToggle}
        classNameToToggleTargetSelector={classNameToToggleTarget}
        triggerSelector={trigger}
        rootMargin={rootMargin}
        threshold={threshold}
        rootSelector={root}
      >
        <a href={anchorTarget} className="back-to-top-btn x-btn x-filled x-raised x-theme-primary">
          <XRippleComponent></XRippleComponent>
          <span>Back to top</span>
        </a>
      </XToggleClassOnScrollComponent>
    </section>
  </article>;
};

export default function XToggleonscrollPage() {
  return <section>
    <header>
      <hgroup>
        <h2>XToggleClassOnScroll Page</h2>
      </hgroup>
    </header>

    {lipsumArticle({anchorTarget: '#top-anchor'})}

    {lipsumArticle({
      className: `${styles['scrollable-element-example']} scrollable-elm-example-1`,
      anchorTarget: '#example-1',
      trigger: '.scrollable-elm-example-1 section',
      root: '.scrollable-elm-example-1',
      title: 'Scrollable Element 1',
      rootMargin: '0px',
      threshold: [0.16, 0.5, 1]
    })}

    {/*{lipsumArticle({*/}
    {/*  className: `${styles['scrollable-element-example']} scrollable-elm-example-2`,*/}
    {/*  anchorTarget: '#example-2',*/}
    {/*  trigger: '.scrollable-elm-example-2 section',*/}
    {/*  root: '.scrollable-elm-example-2',*/}
    {/*  title: 'Scrollable Element 2',*/}
    {/*  threshold: 0.25*/}
    {/*})}*/}

  </section>;
}
