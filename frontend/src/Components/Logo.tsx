import * as React from 'react';
import { SVGProps } from 'react';
import styled from "styled-components";

const StyledSvg = styled.svg`
    display: block;
    width: 1.5rem;
    height: 1.5rem;
`

export default function Logo(props: SVGProps<SVGSVGElement>) {
  return (
      <>
          <StyledSvg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd"
                    d="M12.9824 5.26315C13.9523 5.26315 14.7368 6.04818 14.7368 7.01754C14.7368 7.48257 14.553 7.92888 14.2232 8.25824C13.8947 8.58666 13.4484 8.77192 12.9824 8.77192H7.02316C5.08491 8.77192 3.51439 10.342 3.51439 12.2788C3.51298 14.2615 3.51158 16.655 3.51017 18.2465C3.51017 19.215 2.72421 20 1.75579 20C0.787367 20 0 19.215 0 18.2456C0 16.7485 0 14.4936 0 12.2807C0 8.40514 3.14245 5.26315 7.01754 5.26315H12.9824ZM12.9824 0C14.8449 0 16.6288 0.739181 17.9453 2.05567C19.2617 3.37123 20 5.15649 20 7.01754C20 10.8931 16.8589 14.0351 12.9824 14.0351H7.01754C6.04912 14.0351 5.26315 13.2501 5.26315 12.2807C5.26315 11.3113 6.04912 10.5263 7.01754 10.5263H12.9824C13.913 10.5263 14.8056 10.1567 15.4639 9.49894C16.1221 8.84023 16.4912 7.94853 16.4912 7.01754C16.4912 6.08655 16.1221 5.19485 15.4639 4.53614C14.8056 3.87836 13.913 3.50877 12.9824 3.50877C9.53684 3.50877 4.41824 3.50877 1.75438 3.50877C0.785964 3.50877 0 2.72374 0 1.75438C0 0.785029 0.785964 0 1.75438 0C4.25123 0 8.96982 0 12.9824 0Z"
                    fill="url(#paint0_linear_107_76)"/>
              <defs>
                  <linearGradient id="paint0_linear_107_76" x1="-8.77136" y1="11.2281" x2="22.1123" y2="11.2281"
                                  gradientUnits="userSpaceOnUse">
                      <stop stopColor="#00CCFF"/>
                      <stop offset="0.52" stopColor="#1CD8EA"/>
                      <stop offset="1" stopColor="#75FFA7"/>
                  </linearGradient>
              </defs>
          </StyledSvg>
      </>
  );
}