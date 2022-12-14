import { Button as ButtonNativeBase, Text, IButtonProps as IButtonPropsNativeBase } from 'native-base'

interface IButtonProps extends IButtonPropsNativeBase {
  title: string;
  type?: 'PRIMARY' | 'SECONDARY';
}

export function Button({ title, type = 'PRIMARY', ...props }: IButtonProps) {
  return (
    <ButtonNativeBase
      w="full"
      h={14}
      rounded="sm"
      fontSize="md"
      textTransform="uppercase"
      bg={type === 'SECONDARY' ? 'red.500' : 'yellow.500'}
      _pressed={{
        bg: type === "SECONDARY" ? 'red.600' : 'yellow.600'
      }}
      _loading={{
        _spinner: {
          color: 'black'
        }
      }}
      {...props}>
      <Text
        fontSize="sm"
        fontFamily="heading"
        color={type === "SECONDARY" ? 'white' : 'black'}
      >
        {title}
      </Text>
    </ButtonNativeBase>
  )
}