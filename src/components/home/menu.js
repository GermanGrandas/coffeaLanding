import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Title from "./title"
import Product from "./Product"

const query = graphql`
  {
    products: allContentfulProduct {
      edges {
        node {
          id
          title
          precio
          acidez
          cuerpo
          variedad
          descripcion {
            descripcion
          }
          image {
            fluid(maxHeight: 426) {
              src
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`

const getCategories = items => {
  let tempItems = items.map(items => {
    return items.node.variedad
  })
  let categories = ["Todos", ...Array.from(new Set(tempItems))]
  return categories
}

export default function Menu() {
  return (
    <StaticQuery
      query={query}
      render={data => {
        //let categories = getCategories(data.products.edges)

        return (
          <section className="py-5">
            <div className="container">
              <Title title="Te ofrecemos..." />
              <div className="row mb-5">
                {data.products.edges.map(({ node: product }) => {
                  return <Product key={product.id} product={product} />
                })}
              </div>
            </div>
          </section>
        )
      }}
    />
  )
}

/*export default class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: props.items.edges,
      filtered: props.items.edges,
      categories: this.getCategories(props.items.edges),
    }
  }
  getCategories = items => {
    let tempItems = items.map(items => {
      return items.node.variedad
    })

    let categories = ["Todos", ...Array.from(new Set(tempItems))]
    return categories
  }
  handleItems = category => {
    let tempItems = [...this.state.items]
    category === "Todos"
      ? this.setState({ filtered: tempItems })
      : this.setState({
          filtered: tempItems.filter(({ node }) => node.variedad === category),
        })
  }
  render() {
    let { items, filtered, categories } = this.state

    return (
      <section className="menu py-5">
        <div className="container">
          <Title title="Te ofrecemos..." />
          <div className="row mb-5">
            <div className="col-10 mx-auto text-center">
              {categories.map((category, index) => (
                <button
                  type="button"
                  key={index}
                  className="btn btn-green text-capitalize m-3"
                  onClick={() => {
                    this.handleItems(category)
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div className="row mb-5">
            {items.length > 0 ? (
              filtered.map(({ node }) => {
                return (
                  <div
                    key={node.id}
                    className="col-11 col-md-6 my-3 d-flex mx-auto"
                  >
                    <div>
                      <Img fixed={node.image.fixed} />
                    </div>
                    <div className="flex-grow-1 px-3">
                      <div className="d-flex justify-content-between">
                        <h6 className="mb-0">{node.title}</h6>
                        <h6 className="mb-0 text-blue">
                          <small>${node.precio}</small>
                        </h6>
                      </div>
                      <p className="text-muted">
                        <small>{node.descripcion.descripcion}</small>
                      </p>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="col-10 col-sm-6 mx-auto text-center text-capitalize">
                <h1>No hay productos disponibles</h1>
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }
}*/
