import React, { useState } from "react";
import {
	Box,
	Typography,
	FormGroup,
	FormControlLabel,
	Button,
	Stack,
	Checkbox,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

import CustomTextField from "../../../src/components/forms/theme-elements/CustomTextField";

interface loginType {
	title?: string;
	subtitle?: JSX.Element | JSX.Element[];
	subtext?: JSX.Element | JSX.Element[];
}

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
	const router = useRouter();
	const [value, setValue] = useState({
		username: "",
		password: "",
	});

	const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		//alert(JSON.stringify(value));

		switch (value.username) {
			case "arun":
				value.password === "12345"
					? router.push("/utilities/typography")
					: alert(
							`Please Enter correct password for username ${value.username}.`,
					  );
				break;
			case "yogi":
				value.password === "123456"
					? router.push("/utilities/shadow")
					: alert(
							`Please Enter correct password for username ${value.username}.`,
					  );
				break;

			default:
				alert("Please Enter correct username and password.");
				break;
		}
	};
	return (
		<>
			{title ? (
				<Typography fontWeight="700" variant="h2" mb={1}>
					{title}
				</Typography>
			) : null}

			{subtext}

			<Stack>
				<Box>
					<Typography
						variant="subtitle1"
						fontWeight={600}
						component="label"
						htmlFor="username"
						mb="5px"
					>
						Username
					</Typography>
					<CustomTextField
						name="username"
						variant="outlined"
						fullWidth
						value={value.username}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setValue({ ...value, [e.target?.name]: e.target?.value })
						}
					/>
				</Box>
				<Box mt="25px">
					<Typography
						variant="subtitle1"
						fontWeight={600}
						component="label"
						htmlFor="password"
						mb="5px"
					>
						Password
					</Typography>
					<CustomTextField
						name="password"
						type="password"
						variant="outlined"
						fullWidth
						value={value.password}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setValue({ ...value, [e.target?.name]: e.target?.value })
						}
					/>
				</Box>
				<Stack
					justifyContent="space-between"
					direction="row"
					alignItems="center"
					my={2}
				>
					<FormGroup>
						<FormControlLabel
							control={<Checkbox defaultChecked />}
							label="Remeber this Device"
						/>
					</FormGroup>
					{/* <Typography
						component={Link}
						href="/"
						fontWeight="500"
						sx={{
							textDecoration: "none",
							color: "primary.main",
						}}
					>
						Forgot Password ?
					</Typography> */}
				</Stack>
			</Stack>
			<Box>
				<Button
					color="primary"
					variant="contained"
					size="large"
					fullWidth
					component={Link}
					onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleClick(e)}
					href="/"
					type="submit"
				>
					Sign In
				</Button>
			</Box>
			{subtitle}
		</>
	);
};

export default AuthLogin;
