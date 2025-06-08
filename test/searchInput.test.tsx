/**
 * @jest-environment jsdom
 */
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchInput from '../app/components/SearchInput';
import { useRouter, useSearchParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('SearchInput', () => {
  const push = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push });
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => '',
      toString: () => '',
    });

	push.mockClear();
  });

  it('should type and search', async () => {
    render(<SearchInput />);
    const input = screen.getByPlaceholderText('Search Pokémon...');
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.type(input, 'Bulbasaur');
    await userEvent.click(button);

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith('/?name=Bulbasaur');
    });
  });

  it('should not search if input is blank or only spaces', async () => {
    render(<SearchInput />);
    const input = screen.getByPlaceholderText('Search Pokémon...');
    const button = screen.getByRole('button', { name: /search/i });
  
    // Case: empty string
    await userEvent.clear(input);
    await userEvent.click(button);
    expect(push).not.toHaveBeenCalled();
  
    // Case: only spaces
    await userEvent.clear(input);
    await userEvent.type(input, '    ');
    await userEvent.click(button);
    expect(push).not.toHaveBeenCalled();
  });

  it('should trim whitespace before searching', async () => {
    render(<SearchInput />);
    const input = screen.getByPlaceholderText('Search Pokémon...');
    const button = screen.getByRole('button', { name: /search/i });
  
    await userEvent.type(input, '   Pikachu   ');
    await userEvent.click(button);
  
    await waitFor(() => {
      expect(push).toHaveBeenCalledWith('/?name=Pikachu');
    });
  });

  it('should not search when input is typed and cleared before clicking search', async () => {
    render(<SearchInput />);
    const input = screen.getByPlaceholderText('Search Pokémon...');
    const button = screen.getByRole('button', { name: /search/i });
  
    await userEvent.type(input, 'Pika');
    await userEvent.clear(input); // ลบก่อนกด
    await userEvent.click(button);
  
    expect(push).not.toHaveBeenCalled();
  });

  it('should not push again if input matches current query param', async () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) => (key === 'name' ? 'Charmander' : null),
      toString: () => 'name=Charmander',
    });
  
    render(<SearchInput />);
    const input = screen.getByPlaceholderText('Search Pokémon...');
    const button = screen.getByRole('button', { name: /search/i });
  
    await userEvent.clear(input);
    await userEvent.type(input, 'Charmander');
    await userEvent.click(button);
  
    expect(push).not.toHaveBeenCalled(); // optional optimization
  });

  it('should search valid names with spaces like "Mr. Mime"', async () => {
    render(<SearchInput />);
    const input = screen.getByPlaceholderText('Search Pokémon...');
    const button = screen.getByRole('button', { name: /search/i });
  
    await userEvent.type(input, 'Mr. Mime');
    await userEvent.click(button);
  
    await waitFor(() => {
      expect(push).toHaveBeenCalledWith('/?name=Mr. Mime');
    });
  });

  it('should re-type and search', async () => {
    render(<SearchInput />);
    const input = screen.getByPlaceholderText('Search Pokémon...');
    const button = screen.getByRole('button', { name: /search/i });
  
    await userEvent.type(input, 'WrongName');
    await userEvent.clear(input); // เคลียร์ค่าที่เคยพิมพ์ก่อน
    await userEvent.type(input, 'Bulbasaur');
    await userEvent.click(button);
  
    await waitFor(() => {
      expect(push).toHaveBeenCalledWith('/?name=Bulbasaur');
    });
  });

});