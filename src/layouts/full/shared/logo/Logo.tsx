import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";

const LinkStyled = styled(Link)(() => ({
	// height: "70px",
	width: "180px",
	overflow: "hidden",
	display: "block",
	textAlign: "center",
	textDecoration: "none",
	"& h1": {
		margin: "4px",
	},
}));

const Logo = () => {
	return (
		<LinkStyled href="/">
			<h1>HBS</h1>
		</LinkStyled>
	);
};

export default Logo;
