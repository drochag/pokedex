import { ComponentProps, createElement } from "react"
import { CaretLeft, CaretRight, DotsThree, CaretDoubleLeft, CaretDoubleRight, Icon, IconProps } from "@phosphor-icons/react"

import { Theme } from "@mui/system";

import { Button, ButtonProps } from "@mui/joy"
import styled from "@emotion/styled"

const Pagination = styled('nav')((props: { disabled?: boolean }) => ({
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '100%',
  opacity: props.disabled ? 0.5 : 1,
}))

const PaginationContent = styled('ul')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '0.25rem',
  justifyContent: 'center',
  listStyle: 'none',
  padding: 0
})

const PaginationItem = (props: ComponentProps<'li'>) => <li {...props} />

type PaginationButtonProps = {
  isActive?: boolean;
  paddingSide?: 'left' | 'right';
  as?: React.ElementType;
} & ButtonProps & ComponentProps<typeof Button>

const PaginationButton = styled(({ paddingSide, isActive, disabled, size, as, children, ...props }: PaginationButtonProps) =>
  createElement(as || Button, {
    'aria-current': isActive ? 'page' : undefined,
    variant: isActive ? disabled ? 'outlined' : 'soft' : 'plain',
    size: size || 'sm',
    disabled,
    ...props
  }, children))(props => ({
    gap: '0.25rem',
    ...props.paddingSide && {
      ...props.paddingSide === 'left' && {
        paddingLeft: '0.625rem',
      },
      ...props.paddingSide === 'right' && {
        paddingRight: '0.625rem',
      },
    },
  }))

const PaginationButtonLabel = styled('span')(({ theme }: { theme?: Theme }) => ({
  [theme?.breakpoints.down('md') || '']: {
    display: 'none',
  },
}))

const PaginationIcon = styled(
  ({ IconComponent, ...props }: { IconComponent: Icon } & IconProps) =>
    <IconComponent {...props} />
)({
  height: '1rem',
  width: '1rem',
  marginBottom: '0.125rem',
})

const PaginationPrevious = ({
  className,
  ...props
}: ComponentProps<typeof PaginationButton>) => (
  <PaginationButton
    aria-label="Go to previous page"
    className={className}
    paddingSide="left"
    {...props}
  >
    <PaginationIcon IconComponent={CaretLeft} />
    <PaginationButtonLabel>Previous</PaginationButtonLabel>
  </PaginationButton>
)

const PaginationNext = ({
  className,
  ...props
}: ComponentProps<typeof PaginationButton>) => (
  <PaginationButton
    aria-label="Go to next page"
    className={className}
    paddingSide="right"
    {...props}
  >
    <PaginationButtonLabel>Next</PaginationButtonLabel>
    <PaginationIcon IconComponent={CaretRight} />
  </PaginationButton>
)

const PaginationFirst = ({
  className,
  ...props
}: ComponentProps<typeof PaginationButton>) => (
  <PaginationButton
    aria-label="Go to first page"
    title="Go to first page"
    className={className}
    paddingSide="left"
    {...props}
  >
    <PaginationIcon IconComponent={CaretDoubleLeft} />
    <PaginationButtonLabel>First</PaginationButtonLabel>
  </PaginationButton>
)

const PaginationLast = ({
  className,
  ...props
}: ComponentProps<typeof PaginationButton>) => (
  <PaginationButton
    aria-label="Go to last page"
    className={className}
    paddingSide="right"
    title="Go to last page"
    {...props}
  >
    <PaginationButtonLabel>Last</PaginationButtonLabel>
    <PaginationIcon IconComponent={CaretDoubleRight} />
  </PaginationButton>
)

const SrOnly = styled('span')({
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
})

const Ellipsis = ({
  className,
  ...props
}: ComponentProps<typeof PaginationButton>) => (
  <PaginationButton
    as="span"
    aria-hidden
    className={className}
    {...props}
  >
    <PaginationIcon IconComponent={DotsThree} />
    <SrOnly>More pages</SrOnly>
  </PaginationButton>
)

const PaginationEllipsis = styled(Ellipsis)({
  height: '2.25rem',
  width: '2.25rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationButton,
  PaginationNext,
  PaginationPrevious,
  PaginationFirst,
  PaginationLast,
}
