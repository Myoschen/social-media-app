import { Link } from 'react-router-dom';
import { Button, ListItem } from '@chakra-ui/react';

interface Props {
  to: string;
  icon: JSX.Element;
  text: string;
}

function NavLink({ to, icon, text }: Props) {
  return (
    <ListItem>
      <Button
        as={Link}
        leftIcon={icon}
        to={to}
        variant="ghost"
        w="full"
        justifyContent="start"
        size="lg"
      >
        {text}
      </Button>
    </ListItem>
  );
}

export default NavLink;
