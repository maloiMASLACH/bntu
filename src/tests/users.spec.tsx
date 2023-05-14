/* eslint-disable max-len */
import React from 'react';

const users = {
  eOjr0z67QzWR0DKbujS6KqFapvE2: {
    userData: {
      avatar: "",
      email: "ivanov@tut.by",
      faculty: {
        description: "Ведущий факультет в области подготовки специалистов для всех сфер народного хозяйства, так или иначе связанных с автомобильным транспортом. Проектирование и эксплуатация транспортных средств, организация инфраструктуры, планирование и оценка стоимости и экономической эффективности в сфере автомобильного транспорта - всё это мы.",
        fullName: "Автотракторный факультет",
        id: "atf",
        logo: "fas fa-truck-monster",
        mainImg: "https://firebasestorage.googleapis.com/v0/b/bntu-419bd.appspot.com/o/unit%2Fatf?alt=media&token=426a99ca-2aa6-4c2a-b79d-3a95f09b956e",
        name: "АТФ"
      },
      firstName: "Иван",
      group: "10703118",
      isAdmin: true,
      lastName: "Иванов",
      number: "+375295330918",
      uid: "eOjr0z67QzWR0DKbujS6KqFapvE2"
    }
  },
  hdvEPIQ5TvfBfWtKMAhYOfTTXi53: {
    userData: {
      avatar: "",
      email: "sobolev@gmail.com",
      faculty: {
        description: "Отличительная особенность факультета информационных технологий и робототехники (ФИТР), ставшая определяющей в организации учебного процесса, - интеграция образования, производства и науки, что обеспечивает выпускникам факультета возможность работы в самых разнообразных областях науки и техники, включая малый и большой промышленный, научный и финансовый бизнес, позволяет им стать ведущими специалистами в своей области. Специальности, по которым ведется подготовка специалистов на ФИТР, относятся к мобильным, постоянно развивающимся областям науки и техники. Подготовка высококвалифицированных специалистов для нашей страны достигается исключительным профессионализмом профессорско-преподавательского состава, оснащением лабораторий и кафедр факультета современным оборудованием и вычислительной техникой, внедрением в учебный процесс инновационных методов обучения и активным участием студентов в научных исследованиях. Наши выпускники востребованы в проектно-конструкторских бюро, научно-исследовательских институтах, на предприятиях различных форм собственности как универсальные специалисты с высоким уровнем подготовки. Мы не шагаем в ногу со временем – мы его опережаем.",
        fullName: "Факультет информационных технологий и робототехники",
        id: "fitr",
        logo: "fas fa-robot",
        mainImg: "https://avatars.mds.yandex.net/get-altay/2039785/2a0000017019b119776a1c8cefeccc4eba7d/XXL",
        name: "ФИТР"
      },
      firstName: "Николай",
      group: "10701123",
      isAdmin: false,
      lastName: "Соболев",
      number: "+375292344212",
      uid: "hdvEPIQ5TvfBfWtKMAhYOfTTXi53"
    }
  },
  zRAufIzaOBdHQGj8IjFz4PFKEbb2: {
    classes: {
      d72934c3704c7: "d72934c3704c7",
      f3e4323c58e79: "f3e4323c58e79"
    },
    userData: {
      avatar: "",
      email: "danielkrutoi@mail.ru",
      faculty: {
        description: "Отличительная особенность факультета информационных технологий и робототехники (ФИТР), ставшая определяющей в организации учебного процесса, - интеграция образования, производства и науки, что обеспечивает выпускникам факультета возможность работы в самых разнообразных областях науки и техники, включая малый и большой промышленный, научный и финансовый бизнес, позволяет им стать ведущими специалистами в своей области. Специальности, по которым ведется подготовка специалистов на ФИТР, относятся к мобильным, постоянно развивающимся областям науки и техники. Подготовка высококвалифицированных специалистов для нашей страны достигается исключительным профессионализмом профессорско-преподавательского состава, оснащением лабораторий и кафедр факультета современным оборудованием и вычислительной техникой, внедрением в учебный процесс инновационных методов обучения и активным участием студентов в научных исследованиях. Наши выпускники востребованы в проектно-конструкторских бюро, научно-исследовательских институтах, на предприятиях различных форм собственности как универсальные специалисты с высоким уровнем подготовки. Мы не шагаем в ногу со временем – мы его опережаем.",
        fullName: "Факультет информационных технологий и робототехники",
        id: "fitr",
        logo: "fas fa-robot",
        mainImg: "https://avatars.mds.yandex.net/get-altay/2039785/2a0000017019b119776a1c8cefeccc4eba7d/XXL",
        name: "ФИТР"
      },
      firstName: "Даниил",
      group: "10701119",
      isAdmin: true,
      lastName: "Ломейко",
      number: "+375298298712",
      uid: "zRAufIzaOBdHQGj8IjFz4PFKEbb2"
    }
  }
};

describe('Users', () => {
  it('users type correct', () => {
    expect(Object.values(users)).toBeTruthy();
    expect(Object.values(users)[0]).toBeTruthy();
    expect(Object.values(users)[0].userData.avatar).not.toBe(undefined);
    expect(Object.values(users)[0].userData.email).toBeTruthy();
    expect(Object.values(users)[0].userData.faculty).toBeTruthy();
    expect(Object.values(users)[0].userData.firstName).toBeTruthy();
    expect(Object.values(users)[0].userData.group).toBeTruthy();
    expect(Object.values(users)[0].userData.isAdmin).toBeTruthy();
    expect(Object.values(users)[0].userData.lastName).toBeTruthy();
    expect(Object.values(users)[0].userData.number).toBeTruthy();
    expect(Object.values(users)[0].userData.uid).toBeTruthy();
  });

  it('classes id unique', () => {
    expect(Object.keys(users).filter((userId) => userId === Object.keys(users)[0])).toHaveLength(1);
  });
});
