export abstract class Item<Props> {
  protected props: Props

  abstract get pk(): string
  abstract get sk(): string

  protected constructor(props: Props) {
    this.props = props
  }
}
