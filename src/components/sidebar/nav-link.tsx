import { Link } from 'react-router-dom';
import { Button, ListItem, useColorModeValue } from '@chakra-ui/react';

interface Props {
  to: string;
  icon: JSX.Element;
  text: string;
}

function NavLink({ to, icon, text }: Props) {
  const color = useColorModeValue('black', 'white');

  return (
    <ListItem>
      <Button
        as={Link}
        leftIcon={icon}
        to={to}
        variant="ghost"
        w="full"
        justifyContent="start"
        color={color}
        size="lg"
      >
        {text}
      </Button>
    </ListItem>
  );
}

export default NavLink;
