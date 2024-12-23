import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await axios.get('https://randomuser.me/api/?results=10');
      return response.data.results.map((user) => ({
        id: user.login.uuid,
        uuid: user.login.uuid,
        name: {
          title: user.name.title,
          first: user.name.first,
          last: user.name.last,
        },
        email: user.email,
        image: user.picture.medium,
        location: {
          street: user.location.street.name,
          city: user.location.city,
          country: user.location.country,
        },
      }));
    },
  });
};
