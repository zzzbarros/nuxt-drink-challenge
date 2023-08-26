export interface DrinkProps {
  [key: string]: string
  idDrink: string
  strCategory: string
  strAlcoholic: string
  strDrink: string
  strDrinkThumb: string
  strGlass: string
  strInstructions: string
  strIngredient1: string
  strIngredient2: string
  strIngredient3: string
  strIngredient4: string
}

export type CategoryListProps = Pick<DrinkProps, 'strCategory'>

export interface DrinkListProps {
  drinks: DrinkProps[]
}

export interface FilterProps {
  search: string
  category: string
}
