import * as Koa from 'koa';
import axios from 'axios';

const ROOT_URL = `https://dummyapi.io/data/api`;

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

    ctx.response.status = 200;
    ctx.body = {
      message: 'get users',
      users: responseData.data,
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
    if (!deleteUserIdList.includes(id)) deleteUserIdList.push(id);
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
