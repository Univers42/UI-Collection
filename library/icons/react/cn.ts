/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   cn.ts                                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: rstancu <rstancu@student.42madrid.com>     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2026/04/09 11:45:47 by rstancu           #+#    #+#             */
/*   Updated: 2026/04/09 11:45:48 by rstancu          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

export function cn(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(' ');
}
