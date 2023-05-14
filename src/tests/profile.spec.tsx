import React from 'react';

describe('Profile', () => {
  it('profile should render successfully', () => {
    const profile = document.getElementsByClassName('userProfilePage');

    expect(profile).not.toBe(undefined);
    expect(profile).toBeDefined();
    expect(profile).toBeTruthy();
    expect(profile.namedItem('div')).not.toBe(undefined);
  });

  it('avatarWrapper should render successfully', () => {
    const avatarWrapper = document.getElementsByClassName('avatarWrapper');

    expect(avatarWrapper).not.toBe(undefined);
    expect(avatarWrapper).toBeDefined();
    expect(avatarWrapper).toBeTruthy();
    expect(avatarWrapper.namedItem('div')).not.toBe(undefined);
  });

  it('shortInfo should render successfully', () => {
    const shortInfo = document.getElementsByClassName('shortInfo');

    expect(shortInfo).not.toBe(undefined);
    expect(shortInfo).toBeDefined();
    expect(shortInfo).toBeTruthy();
    expect(shortInfo.namedItem('div')).not.toBe(undefined);
  });

  it('profileButtons should render successfully', () => {
    const profileButtons = document.getElementsByClassName('profileButtons');

    expect(profileButtons).not.toBe(undefined);
    expect(profileButtons).toBeDefined();
    expect(profileButtons).toBeTruthy();
    expect(profileButtons.namedItem('div')).not.toBe(undefined);
  });
});
