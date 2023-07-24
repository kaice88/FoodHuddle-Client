import { isValidElement } from 'react'
import { NavLink } from 'react-router-dom'
import { Breadcrumbs } from '@mantine/core'
import useBreadcrumbs from 'use-react-router-breadcrumbs'

import {options} from '../navbar/options'

function Bread() {
  const breadcrumbs = useBreadcrumbs()
  const generateItems = () => {
    return breadcrumbs.map(({ breadcrumb, match }, index, arr) => {
      if (!isValidElement(breadcrumb) || index == 0)
        return null

      const icon = options.find((item) => item.label.toLocaleLowerCase() === breadcrumb.props.children.toLocaleLowerCase())?.icon

      return index !== arr.length - 1
        ? (
          <NavLink to={match.pathname} key={index} className='breadcrumbs__item'>
          {icon}
          {breadcrumb.props.children}
          </NavLink>)
        : (
          <span key={index} className='breadcrumbs__item'>
            {icon}
            {breadcrumb.props.children}
          </span>)
    })
  }
  return (
    <Breadcrumbs className="breadcrumbs">{generateItems()}</Breadcrumbs>
  )
}

export default Bread
