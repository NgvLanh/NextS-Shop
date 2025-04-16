import { toast } from '../../hooks/use-toast';
import { Button } from '../ui/button';

export default function FacebookLogin() {
  const handleFacebookLogin = () => {
    toast({
      title: 'Thành công',
      description: 'Đăng nhập thành công',
    });
  };
  return (
    <Button type='button' variant='outline' onClick={handleFacebookLogin}>
      Facebook
    </Button>
  );
}
