import { Dialog } from '@base-ui/react/dialog'
import { NavigationMenu } from '@base-ui/react/navigation-menu'
import { RiArrowDownSLine, RiCloseLine, RiMenuLine, RiSearchLine, RiShoppingCartLine } from '@remixicon/react'

interface CardLink {
  href: string
  title: string
  description: string
}

interface CompactLink {
  href: string
  label: string
  count: number
}

/** `cards` panels show a description per link; `compact` panels are a dense grid of names. */
type NavMenu =
  | { label: string; variant: 'cards'; wide?: boolean; links: CardLink[] }
  | { label: string; variant: 'compact'; links: CompactLink[] }

const menus: NavMenu[] = [
  {
    label: 'Discover',
    variant: 'cards',
    wide: true,
    links: [
      {
        href: '/featured',
        title: 'Featured',
        description: 'Hand-picked essays from across the network.',
      },
      { href: '/topics', title: 'Topics', description: 'Follow the subjects you actually care about.' },
      { href: '/authors', title: 'Authors', description: 'Writers worth reading, ranked by nobody.' },
      {
        href: '/collections',
        title: 'Collections',
        description: 'Long reads bundled into a single sitting.',
      },
    ],
  },
  {
    label: 'Categories',
    variant: 'compact',
    links: [
      { href: '/categories/technology', label: 'Technology', count: 482 },
      { href: '/categories/design', label: 'Design', count: 361 },
      { href: '/categories/writing-craft', label: 'Writing Craft', count: 298 },
      { href: '/categories/science', label: 'Science', count: 254 },
      { href: '/categories/culture', label: 'Culture', count: 231 },
      { href: '/categories/business', label: 'Business', count: 207 },
      { href: '/categories/health', label: 'Health', count: 186 },
      { href: '/categories/travel', label: 'Travel', count: 154 },
      { href: '/categories/food', label: 'Food', count: 132 },
      { href: '/categories/photography', label: 'Photography', count: 119 },
    ],
  },
  {
    label: 'Write',
    variant: 'cards',
    links: [
      {
        href: '/editor',
        title: 'The editor',
        description: 'Markdown, keyboard-first, and out of your way.',
      },
      {
        href: '/guides/publishing',
        title: 'Publishing guide',
        description: 'From empty draft to first hundred readers.',
      },
      {
        href: '/newsletters',
        title: 'Newsletters',
        description: 'Every post doubles as an email to your list.',
      },
    ],
  },
]

const plainLinks = [
  { href: '/pricing', label: 'Pricing' },
  { href: '/changelog', label: 'Changelog' },
]

const triggerClass =
  'flex h-9 cursor-default items-center gap-1 rounded-lg px-2.5 text-sm font-medium text-ink-muted ' +
  'transition-colors select-none hover:bg-paper-sunken hover:text-ink data-popup-open:bg-paper-sunken ' +
  'data-popup-open:text-ink data-pressed:bg-paper-sunken focus-visible:outline-2 ' +
  'focus-visible:-outline-offset-1 focus-visible:outline-brand'

const topLinkClass =
  'flex h-9 items-center rounded-lg px-2.5 text-sm font-medium text-ink-muted no-underline ' +
  'transition-colors hover:bg-paper-sunken hover:text-ink data-active:text-ink ' +
  'focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-brand'

/*
 * The panel slides in the direction the pointer travelled between triggers, so
 * moving Discover -> Categories reads as one continuous surface.
 */
const contentClass =
  'h-full w-[calc(100vw-2.5rem)] p-2 sm:w-max ' +
  'transition-[opacity,transform,translate] duration-[var(--duration)] ease-[var(--easing)] ' +
  'data-starting-style:opacity-0 data-ending-style:opacity-0 ' +
  'data-starting-style:data-[activation-direction=left]:translate-x-[-50%] ' +
  'data-starting-style:data-[activation-direction=right]:translate-x-[50%] ' +
  'data-ending-style:data-[activation-direction=left]:translate-x-[50%] ' +
  'data-ending-style:data-[activation-direction=right]:translate-x-[-50%]'

const cardLinkClass =
  'block rounded-lg p-3 text-left no-underline transition-colors hover:bg-paper-sunken ' +
  'focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-brand'

const compactLinkClass =
  'flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm text-ink no-underline ' +
  'transition-colors hover:bg-paper-sunken focus-visible:outline-2 ' +
  'focus-visible:-outline-offset-1 focus-visible:outline-brand'

const iconButtonClass =
  'flex size-9 items-center justify-center rounded-lg text-ink transition-colors select-none ' +
  'hover:bg-paper-sunken focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-brand'

/* Placeholder count — swap for real cart state once the store exists. */
const cartCount: number = 2

export interface SiteNavProps {
  /** Current URL path, used to mark the active top-level link. */
  pathname?: string
}

export default function SiteNav({ pathname = '/' }: SiteNavProps) {
  return (
    <div className="flex min-w-0 flex-1 items-center gap-2">
      <DesktopNav pathname={pathname} />
      <SearchForm className="mx-auto hidden min-w-0 max-w-sm flex-1 lg:flex" />
      <CartLink className="ml-auto" />
      <MobileNav pathname={pathname} />
    </div>
  )
}

function DesktopNav({ pathname }: { pathname: string }) {
  return (
    <NavigationMenu.Root className="hidden shrink-0 lg:block">
      <NavigationMenu.List className="relative flex items-center gap-0.5">
        {menus.map((menu) => (
          <NavigationMenu.Item key={menu.label}>
            <NavigationMenu.Trigger className={triggerClass}>
              {menu.label}
              <NavigationMenu.Icon className="transition-transform duration-200 data-popup-open:rotate-180">
                <RiArrowDownSLine size={16} className="block" />
              </NavigationMenu.Icon>
            </NavigationMenu.Trigger>

            <NavigationMenu.Content className={contentClass}>
              {menu.variant === 'cards' ? (
                <ul
                  className={
                    menu.wide
                      ? 'grid w-120 list-none grid-cols-2 gap-1 p-0'
                      : 'flex w-88 list-none flex-col gap-1 p-0'
                  }
                >
                  {menu.links.map((link) => (
                    <li key={link.href}>
                      <NavigationMenu.Link href={link.href} className={cardLinkClass}>
                        <span className="block text-sm font-medium text-ink">{link.title}</span>
                        <span className="mt-1 block text-sm text-ink-muted">{link.description}</span>
                      </NavigationMenu.Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="grid w-104 list-none grid-cols-2 gap-0.5 p-0">
                  {menu.links.map((link) => (
                    <li key={link.href}>
                      <NavigationMenu.Link href={link.href} className={compactLinkClass}>
                        {link.label}
                        <span className="text-xs text-ink-muted">{link.count}</span>
                      </NavigationMenu.Link>
                    </li>
                  ))}
                </ul>
              )}
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        ))}

        {plainLinks.map((link) => (
          <NavigationMenu.Item key={link.href}>
            <NavigationMenu.Link href={link.href} active={pathname === link.href} className={topLinkClass}>
              {link.label}
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>

      <NavigationMenu.Portal>
        <NavigationMenu.Positioner
          sideOffset={10}
          align="start"
          collisionPadding={{ top: 5, bottom: 5, left: 20, right: 20 }}
          collisionAvoidance={{ side: 'none' }}
          /*
           * The ::before strip bridges the gap between trigger and popup so the
           * menu does not close while the pointer crosses it.
           */
          className="h-[var(--positioner-height)] w-[var(--positioner-width)] max-w-[var(--available-width)] transition-[top,left,right,bottom] duration-[var(--duration)] ease-[var(--easing)] before:absolute before:inset-x-0 before:top-[-10px] before:h-2.5 before:content-[''] data-instant:transition-none"
          style={{
            ['--duration' as string]: '0.32s',
            ['--easing' as string]: 'cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <NavigationMenu.Popup className="relative h-[var(--popup-height)] w-[var(--popup-width)] origin-[var(--transform-origin)] rounded-2xl border border-rule bg-paper-raised shadow-xl shadow-ink/8 outline-none transition-[opacity,transform,width,height,scale] duration-[var(--duration)] ease-[var(--easing)] data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0 data-ending-style:duration-150 data-ending-style:ease-out">
            <NavigationMenu.Viewport className="relative h-full w-full overflow-hidden" />
          </NavigationMenu.Popup>
        </NavigationMenu.Positioner>
      </NavigationMenu.Portal>
    </NavigationMenu.Root>
  )
}

/* Plain GET form, so search keeps working before the island hydrates. */
function SearchForm({ className = '' }: { className?: string }) {
  return (
    <form action="/search" method="get" role="search" className={`relative items-center ${className}`}>
      <RiSearchLine
        size={16}
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-ink-muted"
      />
      <label className="sr-only" htmlFor="site-search">
        Search posts
      </label>
      <input
        id="site-search"
        type="search"
        name="q"
        placeholder="Search posts, authors, topics…"
        className="h-9 w-full rounded-lg border border-rule bg-paper-raised pr-3 pl-9 text-sm text-ink placeholder:text-ink-muted focus:border-brand/50 focus:outline-2 focus:-outline-offset-2 focus:outline-brand/30"
      />
    </form>
  )
}

function CartLink({ className = '' }: { className?: string }) {
  return (
    <a
      href="/shoping-cart"
      aria-label={`Shopping cart, ${cartCount.toString()} items`}
      className={`relative shrink-0 no-underline ${iconButtonClass} ${className}`}
    >
      <RiShoppingCartLine size={20} className="block" />
      {cartCount > 0 && (
        <span
          aria-hidden="true"
          className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-brand text-[0.625rem] font-semibold text-white"
        >
          {cartCount}
        </span>
      )}
    </a>
  )
}

function MobileNav({ pathname }: { pathname: string }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger aria-label="Open navigation menu" className={`shrink-0 lg:hidden ${iconButtonClass}`}>
        <RiMenuLine size={20} className="block" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 min-h-dvh bg-ink/25 backdrop-blur-xs transition-opacity duration-200 data-starting-style:opacity-0 data-ending-style:opacity-0 supports-[-webkit-touch-callout:none]:absolute" />
        <Dialog.Popup className="fixed inset-y-0 right-0 flex w-76 max-w-[85vw] flex-col overflow-y-auto border-l border-rule bg-paper-raised p-5 transition-transform duration-250 ease-out data-starting-style:translate-x-full data-ending-style:translate-x-full">
          <div className="flex items-center justify-between">
            <Dialog.Title className="font-serif text-lg text-ink">Menu</Dialog.Title>
            <Dialog.Close aria-label="Close navigation menu" className={iconButtonClass}>
              <RiCloseLine size={20} className="block" />
            </Dialog.Close>
          </div>

          <SearchForm className="mt-5 flex" />

          <nav className="mt-6 flex flex-col gap-6">
            {menus.map((menu) => (
              <div key={menu.label}>
                <p className="px-2 text-xs font-semibold tracking-widest text-ink-muted uppercase">
                  {menu.label}
                </p>
                {menu.variant === 'cards' ? (
                  <ul className="mt-2 flex list-none flex-col p-0">
                    {menu.links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          className="block rounded-lg px-2 py-2 text-sm font-medium text-ink no-underline transition-colors hover:bg-paper-sunken"
                        >
                          {link.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="mt-2 grid list-none grid-cols-2 gap-x-2 p-0">
                    {menu.links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          className="block rounded-lg px-2 py-2 text-sm text-ink no-underline transition-colors hover:bg-paper-sunken"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            <ul className="flex list-none flex-col border-t border-rule p-0 pt-4">
              {plainLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={pathname === link.href ? 'page' : undefined}
                    className="block rounded-lg px-2 py-2 text-sm font-medium text-ink no-underline transition-colors hover:bg-paper-sunken"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto pt-8">
            <a
              href="/signup"
              className="flex h-10 items-center justify-center rounded-lg bg-brand text-sm font-medium text-white no-underline transition-colors hover:bg-brand-strong"
            >
              Start writing
            </a>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
