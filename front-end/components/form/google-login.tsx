import { toast } from '../../hooks/use-toast';
import { Button } from '../ui/button';

export default function GoogleLogin() {
  const handleGoogleLogin = () => {
    toast({
      title: 'Thành công',
      description: 'Đăng nhập thành công',
    });
  };
  return (
    <Button type='button' variant='outline' onClick={handleGoogleLogin}>
      Google
    </Button>
  );
}
