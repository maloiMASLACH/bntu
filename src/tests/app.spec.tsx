import React from 'react';

describe('App', () => {
  it('app wrapper render successfully', () => {
    const root = document.getElementsByClassName('root');

    expect(root).not.toBe(undefined);
    expect(root).toBeDefined();
    expect(root).toBeTruthy();
    expect(root.namedItem('div')).not.toBe(undefined);
  });

  it('body render successfully', () => {
    const body = document.getElementsByTagName('body');

    expect(body).not.toBe(undefined);
    expect(body).toBeDefined();
    expect(body).toBeTruthy();
    expect(body.length).toBe(1);
    expect(body.namedItem('body')).not.toBe(undefined);
  });

  it('navbar should render successfully', () => {
    const navbar = document.getElementsByClassName('navbar');

    expect(navbar).not.toBe(undefined);
    expect(navbar).toBeDefined();
    expect(navbar).toBeTruthy();
    expect(navbar.namedItem('div')).not.toBe(undefined);
  });
});
