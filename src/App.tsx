import { Grid, GridItem, Text } from "@chakra-ui/react"
import NavBar from "./components/NavBar"
import CategoryList from "./components/CategoryList"

function App() {
  return (
    <>
      <Grid padding={5} templateAreas={{
        base: `"nav nav" "aside main"`,
      }}>
        <GridItem area={"nav"}>
          <NavBar/>
        </GridItem>
        <GridItem area={"aside"}>
        </GridItem>
        <GridItem area={"main"}>
        </GridItem>
      </Grid>
    </>
  )
}

export default App
