import Koa from 'koa';
import _ from 'lodash';
import axios from 'axios';

const ROOT_URL = `https://dummyapi.io/data/api`;

interface Users {
  id: string;
  lastName: string;
  firstName: string;
  email: string;
  title: string;
  picture: string;
}

const deleteUserIdList: string[] = [];

export const getUsers = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const response = await axios.get(`${ROOT_URL}/user`, {
    params: {
      limit: 50,
    },
    headers: {
      'app-id': process.env.DUMMY_API_APP_ID,
    },
  });
  if (response) {
    const responseData = response.data;
    // console.log('responseData = ', responseData);

    const usersList = responseData.data;

    const formattedUsersList: Users[] = [];
    if (!_.isEmpty(deleteUserIdList)) {
      usersList.forEach((item: Users, i: number) => {
        let value = '';
        deleteUserIdList.forEach((deleteUserId: string, i: number) => {
          value = deleteUserId;
        });

        if (item.id !== value) {
          formattedUsersList.push(item);
        }
      });
    }

    ctx.response.status = 200;
    ctx.body = {
      message: 'get users',
      users: _.isEmpty(formattedUsersList) ? usersList : formattedUsersList,
      total: responseData.total,
      page: responseData.page,
      limit: responseData.limit,
      offset: responseData.offset,
    };
  } else {
    ctx.response.status = 400;
    ctx.body = {
      message: 'get users error',
    };
  }
};

export const deleteUserById = async (ctx: Koa.Context, next: () => Promise<any>): Promise<void> => {
  const id = ctx.params.id;
  console.log('id = ', id);

  if (id) {
    if (!deleteUserIdList.includes(id)) {
      deleteUserIdList.push(id);
    }
    ctx.response.status = 200;
    ctx.body = {
      message: 'delete user by id',
      deletedUsers: deleteUserIdList,
    };
  } else {
    ctx.response.status = 400;
    ctx.body = {
      message: 'delete user by id, missing id',
    };
  }
};
