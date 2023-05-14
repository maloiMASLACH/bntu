/* eslint-disable max-len */
import React from 'react';

const classes = {
  d72934c3704c7: {
    classData: {
      date: "Четверг, 13:00; Вторник, 14:00",
      dateString: "Четверг, 13:00; Вторник, 14:00",
      description: "Электро́нная вычисли́тельная маши́на (сокращённо ЭВМ) — комплекс технических, аппаратных и программных средств, предназначенных для автоматической обработки информации, вычислений, автоматического управления. ",
      id: "d72934c3704c7",
      img: "https://firebasestorage.googleapis.com/v0/b/bntu-419bd.appspot.com/o/class%2Fd72934c3704c7?alt=media&token=59f4bf82-f687-43d9-98cd-77581c5c3281",
      masterId: "eOjr0z67QzWR0DKbujS6KqFapvE2",
      name: "Основы ЭВМ",
      place: "к.1, ауд.12",
      units: [
        "fitr"
      ]
    },
    users: {
      zRAufIzaOBdHQGj8IjFz4PFKEbb2: "zRAufIzaOBdHQGj8IjFz4PFKEbb2"
    }
  },
  f3e4323c58e79: {
    classData: {
      date: "25.05.2023, 17:30:00",
      dateString: "",
      description: "Армрестлинг — вид борьбы на руках между двумя участниками. Во время матча одноимённые руки соревнующихся ставятся на твёрдую, ровную поверхность, и ладони сцепляются в замок. Задачей соревнующегося рукоборца является прижатие руки противника к поверхности.",
      id: "f3e4323c58e79",
      img: "https://firebasestorage.googleapis.com/v0/b/bntu-419bd.appspot.com/o/class%2Ff3e4323c58e79?alt=media&token=87dfe830-f99d-4126-8fc2-c949ed564b7e",
      masterId: "zRAufIzaOBdHQGj8IjFz4PFKEbb2",
      name: "Армрестлинг",
      place: "к.Спортивный корпус 11A, ауд.Спортивный зал",
      units: [
        "af",
        "atf",
        "ef",
        "fes",
        "fgde",
        "fitr",
        "fmmp",
        "fms",
        "ftk",
        "ftyg",
        "ipf",
        "msf",
        "mtf",
        "psf",
        "sf",
        "stf",
        "vtf"
      ]
    },
    users: ""
  }
};

describe('Classes', () => {
  it('classes wrapper should render successfully', () => {
    const classesWrapper = document.getElementsByClassName('classesListWrapper');

    expect(classesWrapper).not.toBe(undefined);
    expect(classesWrapper).toBeDefined();
    expect(classesWrapper).toBeTruthy();
    expect(classesWrapper.namedItem('div')).not.toBe(undefined);
  });

  it('class type correct', () => {
    expect(Object.values(classes)).toBeTruthy();
    expect(Object.values(classes)[0]).toBeTruthy();
    expect(Object.values(classes)[0].classData.date).toBeTruthy();
    expect(Object.values(classes)[0].classData.dateString).toBeTruthy();
    expect(Object.values(classes)[0].classData.description).toBeTruthy();
    expect(Object.values(classes)[0].classData.id).toBeTruthy();
    expect(Object.values(classes)[0].classData.img).toBeTruthy();
    expect(Object.values(classes)[0].classData.masterId).toBeTruthy();
    expect(Object.values(classes)[0].classData.name).toBeTruthy();
    expect(Object.values(classes)[0].classData.place).toBeTruthy();
    expect(Object.values(classes)[0].classData.units).toBeTruthy();
  });

  it('classes id unique', () => {
    expect(Object.keys(classes).filter((classId) => classId === Object.keys(classes)[0])).toHaveLength(1);
  });
});
